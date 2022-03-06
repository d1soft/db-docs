import { BaseConnectionBuilder } from './BaseConnectionBuilder';
import { BuilderConfig } from './interfaces';
import { ConnectionBuilder } from './ConnectionBuilder';
import { readFile } from './Utils';

export class EnvConnectionBuilder extends BaseConnectionBuilder implements ConnectionBuilder {
  constructor() {
    super('EnvConnectionBuilder');
  }

  /**
   * Extends configuration file with replacement template from external environment file
   * 
   * @param config Configuration
   */
  public async build(config: BuilderConfig): Promise<string> {
    const env = await this.parseFileSync(config.path);
    return this.fill(config.connection, (name: string) => env[name]);
  }

  /**
   * Parses external environment file
   * 
   * @param path Path to file
   */
  protected async parseFileSync(path: string): Promise<Record<string, string>> {
    const result: Record<string, string> = {};

    const file = await readFile(path);
    const lines = file.toString().split('\n')
    for (const line of lines) {
      const match = line.match(/^([^=:#]+?)[=:](.*)/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim()
        result[key] = value
      }
    }

    return result;
  }
}
