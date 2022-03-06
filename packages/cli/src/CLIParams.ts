export interface CLIParams {
  database?: string;
  config?: string;
  templaters?: string[];
  output?: string;
  ignoreTables?: string[];
  erd?: boolean;
}