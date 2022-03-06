import { BuilderConfig } from './interfaces/BuilderConfig';

export interface ConnectionBuilder {
  name: string;
  build(config?: BuilderConfig): Promise<string>;
}