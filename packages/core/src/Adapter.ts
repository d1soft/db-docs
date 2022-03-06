import type { ConfigDatabase } from '@db-docs/config';
import { Schema } from './interfaces';
import { Feature } from './Features';

export interface DatabaseAdapter {
  getFeatures(): Feature[];
  getSchema(): Promise<Schema>;

  connect(config: ConfigDatabase): Promise<this>;
  close(): Promise<this>;
}