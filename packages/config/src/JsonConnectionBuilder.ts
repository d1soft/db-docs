import { BaseConnectionBuilder } from './BaseConnectionBuilder';
import { BuilderConfig } from './interfaces';
import { ConnectionBuilder } from './ConnectionBuilder';
import { parseJson } from './Utils';

export class JsonConnectionBuilder extends BaseConnectionBuilder implements ConnectionBuilder {
  constructor() {
    super('JsonConnectionBuilder');
  }

  public async build(config: BuilderConfig): Promise<string> {
    const json = await parseJson<Record<string, any>>(config.path);

    return this.fill(config.connection,
      (name: string) => this.search(name, json)
    );
  }

  private search(
    key: string,
    obj: Record<string, any>,
    separator: string = '.'
  ): string | undefined {
    const properties = key.split(separator);

    for (const property of properties) {
      if (!obj[property]) {
        return undefined;
      }

      if (typeof obj[property] !== 'object') {
        return obj[property];
      }

      obj = obj[property];
    }
  }
}
