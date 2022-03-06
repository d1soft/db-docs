import { ConfigSSH } from './ConfigSSH';

export interface ConfigDatabase {
  connectionName: string;
  databaseName: string;
  ssh?: ConfigSSH;
  connection: string;
  adapter: string;
  ignoreTables: string[];

  /**
   * Generate ER Diagram
   */
  erd: boolean;

  /**
   * Path to file (if db use files)
   */
  path?: string;
};
