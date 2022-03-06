import { resolve } from 'path';
import { writeFile } from 'fs/promises';
import type { Logger } from '@db-docs/logger';
import { Schema, Table } from '../interfaces';
import { Templater } from './Templater';
import { TemplaterConfig } from './TemplaterConfig';

export class DDLFileGenerator implements Templater {
  constructor(private readonly logger: Logger) { }

  public async build(schema: Schema, config: TemplaterConfig): Promise<void> {
    const file = resolve(config.outputPath, 'ddl.sql');

    const weightMap = this.countReferencesWeight(schema.tables || []);
    const tablesDDL = weightMap
      .map((entry) => schema.tables?.find(t => t.name === entry[0])?.ddl)
      .filter(x => x)
      .join('\n\n');

    await writeFile(file, tablesDDL);

    this.logger.info(`Builded DDL file for '${schema.connectionName}' to '${file}'`, 'Docs builder');
    this.logger.debug(`References weight map\t`, 'DDL file builder', weightMap.map(c => (c.join(': '))).join('\n'));
  }

  private countReferencesWeight(tables: Table[]): [string, number][] {
    const weightMap: [string, number][] = [];
    tables.forEach((outterTable) => {
      let weight = 0;
      tables.forEach((innerTable) => {
        if (innerTable.name !== outterTable.name) {
          innerTable.foreigns?.forEach((f) => {
            if (f.tableRef === outterTable.name) {
              weight++;
            }
          });
        }
      });

      weightMap.push([outterTable.name, weight]);
    });

    return weightMap.sort((entry1, entry2) => {
      return entry2[1] - entry1[1];
    });
  }
}
