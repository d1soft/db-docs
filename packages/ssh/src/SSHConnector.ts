import { readFile } from 'fs/promises';
import type { Server } from 'net';
import tunnel from 'tunnel-ssh';
import type { ConfigSSH } from '@db-docs/config';
import type { Logger } from '@db-docs/logger';

export class SSHConnector {
  constructor(private readonly logger: Logger) { }

  public async connect(config: ConfigSSH): Promise<Server> {
    this.logger.info(`Use SSH tunnel forwarding`, 'SSH tunnel');
    this.logger.info(`Forwarding started...`, 'SSH tunnel');
    this.logger.info(`Connection to ${config.host}:${config.port}`, 'SSH tunnel');

    return new Promise(async (res, rej) => {
      tunnel({
        username: config.username,
        host: config.host,
        port: config.port,
        passphrase: config.password,
        privateKey: await this.readPrivateKey(config),
        dstHost: config.destinationHost,
        dstPort: config.destinationPort,
        localHost: config.sourceHost,
        localPort: config.sourcePort
      }, (error, server) => {
        if (error) rej(error);
        res(server);
      });
    });
  }

  private async readPrivateKey(config: ConfigSSH): Promise<string | undefined> {
    if (!config.privateKeyContent && !config.privateKeyPath) {
      return undefined;
    }

    if (config.privateKeyContent) {
      return config.privateKeyContent;
    }

    if (config.privateKeyPath) {
      const key = await readFile(config.privateKeyPath);
      return key.toString();
    }
  }
}