import { resolve } from 'path';
import { writeFile } from 'fs/promises';
import YAML from 'yaml';
import type { Logger } from '@db-docs/logger';
import { Schema } from '../interfaces';
import { Templater } from './Templater';
import { TemplaterConfig } from './TemplaterConfig';

export class YamlTemplater implements Templater {
  constructor(private readonly logger: Logger) { }

  public async build(schema: Schema, config: TemplaterConfig): Promise<void> {
    const file = resolve(config.outputPath, config.outputName || 'docs.yml');

    await writeFile(file, YAML.stringify(schema));

    this.logger.info(`Builded docs for "${schema.connectionName}" in yaml to '${file}'`, 'Docs builder');
  }
}
