import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import * as Mustache from 'mustache';
import type { Logger } from '@db-docs/logger';
import { Schema } from '../interfaces';
import { TemplaterConfig } from './TemplaterConfig';
import { Templater } from './Templater';

export class MustacheTemplateFiller implements Templater {
  constructor(private readonly logger: Logger) { }

  public async build(schema: Schema, config: TemplaterConfig): Promise<void> {
    const pageTemplate = (await readFile(config.templatePath)).toString();

    Mustache.parse(pageTemplate);

    const result = Mustache.render(pageTemplate, {
      tocItems: schema,
    });

    const file = resolve(
      config.outputPath,
      `${config.outputName}.${config.templaterName}`
    );

    await writeFile(file, result);

    this.logger.info(
      `Builded docs for "${schema.connectionName}" in ${config.templaterName} to '${file}'`,
      `Docs builder`
    );
  }
}
