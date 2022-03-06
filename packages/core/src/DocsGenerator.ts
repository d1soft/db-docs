import { join } from 'path';
import type { Logger } from '@db-docs/logger';
import type { Config, ConfigDatabase } from '@db-docs/config';
import {
  Templater,
  JsonTemplater,
  YamlTemplater,
  DDLFileGenerator,
  MustacheTemplateFiller,
  TemplaterConfig,
} from './templaters';
import { isModuleInstalled, mkDirIfNotExists } from './Utils';
import { DatabaseAdapter } from './Adapter';

export class DocsGenerator {
  constructor(
    private readonly config: Config,
    private readonly logger: Logger,
  ) {}

  public async generate(): Promise<void> {
    const isSingleDatabase = this.config.databases.length === 1;

    await mkDirIfNotExists(this.config.output);

    for (const db of this.config.databases) {

      if (db.ssh) {
        if (!await isModuleInstalled('@db-docs/ssh')) {
          throw new Error(`DocsGenerator. To use ssh you should install '@db-docs/ssh' module`);
        }

        const sshConnector = new (require('@db-docs/ssh'))(this.logger);
        await sshConnector.connect(db.ssh);
      }

      const adapter = await this.getAdapter(db);
      if (adapter) {
        await adapter.connect(db);

        const schema = await adapter.getSchema();

        const path = isSingleDatabase
          ? this.config.output
          : join(this.config.output, db.connectionName);

        await mkDirIfNotExists(path);

        for (const templater of this.config.templaters) {
          await this.getTemplater({
            templatePath: templater.templatePath,
            templaterName: templater.name,
            outputName: templater.outputName,
            outputPath: path,
          }, schema.connectionName);
        }

        // if (db.erd) {
        //   if (!await isModuleInstalled('@db-docs/erd')) {
        //     throw new Error(`ERDGenerator. To use ERDiagrams generation you should install '@db-docs/erd' module`);
        //   }
  
        //   const sshConnector = new (require('@db-docs/erd'))(this.logger);
        //   await sshConnector.connect(db.ssh);
        // }
      }
    }

    return;
  }

  private async getAdapter(config: ConfigDatabase): Promise<DatabaseAdapter | undefined> {
    switch (config.adapter) {
      case 'sql-file':
      case 'sqlite':
      case 'mysql': {
        if (!await isModuleInstalled(`@db-docs/${config.adapter}`)) {
          throw new Error(`DocsGenerator. To build docs you should install '@db-docs/${config.adapter}' module`)
        }

        return new (require(`@db-docs/${config.adapter}`))();
      }
    
      default: {
        this.logger.error(`DocsGenerator. Unknown or unsupported adapter '${config.adapter}' for connection '${config.connectionName}'`);

        return undefined;
      }
    }
  }

  private async getTemplater(config: TemplaterConfig, connectionName: string): Promise<Templater | undefined> {
    switch (config.templaterName) {
      case 'yaml': return new YamlTemplater(this.logger);
      case 'json': return new JsonTemplater(this.logger);
      case 'file': return new DDLFileGenerator(this.logger);

      case 'html':
      case 'md':
      case 'confluence-wiki':
      case 'confluence-storage':
        return new MustacheTemplateFiller(this.logger);

      default:
        this.logger.info(`DocsGenerator. Try found templater from 3rd party modules...`);
        if (await isModuleInstalled(config.templaterName)) {
          return new (require(config.templaterName))();
        }

        this.logger.error(`DocsGenerator. Unknown or unsupported templater '${config.templaterName}' for connection '${connectionName}'`);

        return undefined;
    }
  }
}