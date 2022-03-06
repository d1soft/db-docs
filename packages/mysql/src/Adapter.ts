import { Table, Event, Routine, DatabaseAdapter } from '@db-docs/core';

export interface MySQLAdapter extends DatabaseAdapter {
  getTables(): Promise<Table[]>;
  getEvents(): Promise<Event[]>;
  getRoutines(): Promise<Routine[]>;

  getColumns(tables: Table[]): Promise<void>;
  getTriggers(tables: Table[]): Promise<void>;
  getForeigns(tables: Table[]): Promise<void>;
  getIndexes(tables: Table[]): Promise<void>;
}
