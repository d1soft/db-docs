import { ConfigDatabase } from './ConfigDatabase';
import { ConfigPlugin } from './ConfigPlugin';
import { ConfigTemplater } from './ConfigTemplater';

export interface Config {
  databases: ConfigDatabase[];
  templaters: ConfigTemplater[];
  output: string;
  plugins: ConfigPlugin[];
};
