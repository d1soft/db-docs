import { ConfigFileDatabase } from './ConfigFileDatabase';
import { ConfigFilePlugin } from './ConfigFilePlugin';
import { ConfigFileTemplater } from './ConfigFileTemplater';

export interface ConfigFile {
  /**
   * Databases connections
   */
  databases: ConfigFileDatabase[];

  /**
   * Templaters configuraiton (override template)
   */
  templaters: Array<string | ConfigFileTemplater>;

  /**
   * Used plugins and their configs (if exists)
   */
  plugins: Array<string | ConfigFilePlugin>;

  /**
   * Output directory path
   */
  output: string;
};
