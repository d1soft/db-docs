import { ConfigSSH } from '../ConfigSSH';

/**
 * Database connections configuration
 */
export interface ConfigFileDatabase {
  /**
   * Connection name
   */
  name: string;

  /**
   * Generate erd
   */
  erd: boolean;

  /**
   * Exclude tables from docs
   */
  ignoreTables: string[];

  /**
   * Direct connection string
   * Example: mysql://user:pass@localhost:port/database_name
   */
  connection?: string;

  /**
   * Path to database file
   * Used for sqlite, sql-file adapter for example
   */
  path?: string;

  /**
   * Builds connection from .env config
   */
  envConfig?: {
    /**
     * Path to .env
     */
    path: string;

    /**
     * Connection string with vars from env in curve brackets: {VAR_NAME}
     * Example: mysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}
     */
    connection: string;
  };

  /**
   * Builds connection from .json config
   */
  jsonConfig?: {
    /**
     * Path to .json
     */
    path: string;

    /**
     * Connection string with vars from json in curve brackets: {var.name}. Allowed nested vars.
     * Example: mysql://{database.user}:{database.pass}@{database.host}:{database.port}/{database.name}
     */
    connection: string;
  };

  /**
   * Builds connection from custom builder
   */
  customConfig?: {
    /**
     * Module name
     */
    name: string;

    /**
     * Path to .json
     */
    path: string;

    /**
     * Connection string with vars from custom builder
     */
    connection: string;
  }

  /**
   * SSH tunnel configuration
   */
  ssh?: ConfigSSH;
};
