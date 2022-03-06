import { readFile } from 'fs/promises';
import { Parser, type AST } from 'node-sql-parser';
import type { Config, ConfigDatabase } from '@db-docs/config';
import type { Feature, Schema, DatabaseAdapter } from '@db-docs/core';

export class SQLFileAdapter implements DatabaseAdapter {

  private parser!: Parser;
  private sqlAst!: AST | AST[];

  constructor(private readonly config?: Config) {
    this.parser = new Parser();
  }

  public async connect(config: ConfigDatabase): Promise<this> {
    if (!config.path) {
      throw new Error(`SQLFile Adapter. Config 'path' required.`);
    }

    const sql = await readFile(config.path);

    this.sqlAst = this.parser.astify(sql.toString());

    return this;
  }

  public async close(): Promise<this> {
    this.sqlAst = [];

    return this;
  }

  public getFeatures(): Feature[] {
    return [];
  }

  public async getSchema(): Promise<Schema> {
    return {} as Schema;
  }
}