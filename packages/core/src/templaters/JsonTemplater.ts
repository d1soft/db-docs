import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import type { Logger } from '@db-docs/logger';
import { Schema } from '../interfaces';
import { Templater } from './Templater';
import { TemplaterConfig } from './TemplaterConfig';

export class JsonTemplater implements Templater {
  constructor(private readonly logger: Logger) {}

  public async build(schema: Schema, config: TemplaterConfig): Promise<void> {
    const file = resolve(config.outputPath, 'docs.json');

    await writeFile(file, JSON.stringify(schema, null, 4));

    this.logger.info(`Builded docs for '${schema.connectionName}' in json to '${file}'`, 'Docs builder');
  }
}
