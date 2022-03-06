import { resolve, dirname, isAbsolute } from 'path';
import {
  Config,
  ConfigDatabase,
  ConfigFile,
  ConfigFileDatabase,
  ConfigFileTemplater,
  ConfigTemplater,
  ConnectionStringInfo
} from './interfaces';
import {
  ConnectionStringMatcher,
  isModuleInstalled,
  parseJsonAndFillProcessEnv
} from './Utils';
import { EnvConnectionBuilder } from './EnvConnectionBuilder';
import { JsonConnectionBuilder } from './JsonConnectionBuilder';
import { DefaulTemplatesPaths } from './DefaultTemplatesPaths';
import { ConnectionBuilder } from './ConnectionBuilder';

export class ConfigParser {
  constructor(
    private readonly configPath: string,
  ) {}

  public async parse(): Promise<Config | null> {
    const configFile = await parseJsonAndFillProcessEnv<ConfigFile>(this.configPath);
    if (!configFile.databases || configFile.databases.length === 0) {
      return null;
    }

    if (!configFile.templaters || configFile.templaters.length === 0) {
      configFile.templaters = ['html'];
    }

    configFile.output = this.getOutputPath(configFile.output, this.configPath);

    const databases: ConfigDatabase[] = [];
    const templaters: ConfigTemplater[] = [];

    for (let i = 0; i < configFile.databases.length; i++) {
      const connectionConfig = await this.buildDatabaseConfig(configFile.databases[i], i);
      databases.push(connectionConfig);
    }

    for (const templater of configFile.templaters) {
      const templaterConfig = await this.buildTemplaterConfig(templater);
      templaters.push(templaterConfig);
    }

    return {
      databases,
      output: configFile.output,
      templaters,
      plugins: [],
    };
  }

  private async buildDatabaseConfig(config: ConfigFileDatabase, index: number): Promise<ConfigDatabase> {
    config.name = config.name || `Connection #${index.toString()}`;

    const { erd, ignoreTables = [], name: connectionName, ssh, path } = config;

    const connection = await this.connectionBuild(config);
    if (!connection) {
      throw new Error(
        `Config. Connection not passed: connection name '${connectionName}'`
      );
    }

    const connectionStringInfo = this.getConnectionStringInfo(connection);
    if (!connectionStringInfo?.adapter) {
      throw new Error(
        `Config. Unsupported adapter connection passed: connection name '${connectionName}'`
      );
    }

    if (!connectionStringInfo?.databaseName) {
      throw new Error(
        `Config. Can't retrieve database name from connection string: connection name '${connectionName}'`
      );
    }

    if (ssh) {
      if (!await isModuleInstalled('@db-docs/ssh')) {
        throw new Error(`SSHConfig. To use ssh you should install '@db-docs/ssh' module`);
      }

      if (!ssh.host) {
        throw new Error(`SSHConfig. 'host' must be defined`);
      }

      if (!ssh.username && !(ssh.privateKeyContent || ssh.privateKeyPath)) {
        throw new Error(`SSHConfig. 'username' and 'password', or 'privateKeyContent', or 'privateKeyPath' must be defined`);
      }
    }

    return {
      adapter: connectionStringInfo.adapter,
      connection,
      connectionName,
      databaseName: connectionStringInfo.databaseName,
      erd: erd === true,
      ignoreTables,
      ssh,
      path,
    }
  }

  private async buildTemplaterConfig(templater: ConfigFileTemplater | string): Promise<ConfigTemplater> {
    const defaultOutputName = 'docs';

    if (typeof templater === 'object') {
      const [name] = Object.keys(templater);
      const config = templater[name];

      if (!name) {
        throw new Error('Config. Incorrect template configuration: template name is undefined');
      }

      if (!config) {
        throw new Error('Config. Incorrect template configuration: template config object is undefined, you should use default templates instead');
      }

      return {
        name: name,
        templatePath: resolve(config.template || DefaulTemplatesPaths[name]),
        outputName: config.outputName || defaultOutputName,
      }

    } else if (typeof templater === 'string') {
      return {
        name: templater,
        templatePath: resolve(DefaulTemplatesPaths[templater]),
        outputName: defaultOutputName
      }
    } else {
      throw new Error(`Config. Incorrect template configuration: unknown format with type ${typeof templater}`);
    }
  }

  /**
   * Builds connection string from specified configuration method
   *
   * @param {ConfigFileDatabase} db Database configuration
   */
  private async connectionBuild(db: ConfigFileDatabase): Promise<string | null> {
    const { envConfig, jsonConfig, customConfig } = db;

    if (envConfig) {
      return await new EnvConnectionBuilder().build(envConfig);
    } else if (jsonConfig) {
      return await new JsonConnectionBuilder().build(jsonConfig);
    } else if (customConfig) {
      if (!await isModuleInstalled(customConfig.name)) {
        throw new Error(`Config. Can't resolv custom config builder: '${customConfig.name}'`);
      }

      const module: new () => ConnectionBuilder = require(customConfig.name);
      return await (new module()).build({
        path: customConfig.path,
        connection: customConfig.connection,
      });
    } else if (db.connection) {
      return db.connection;
    } else {
      return null;
    }
  }

  private getOutputPath(defaultOutput: string, output?: string): string {
    return output
      ? isAbsolute(output)
        ? output
        : resolve(dirname(defaultOutput), output)
      : resolve(dirname(defaultOutput), 'db-docs');
  }

  private getConnectionStringInfo(connection: string): ConnectionStringInfo | undefined {
    const matched = connection.match(ConnectionStringMatcher);

    if (matched && matched?.groups) {
      return {
        databaseName: matched.groups['dbname'],
        adapter: matched.groups['adapter'],
      }
    }
  }
}
