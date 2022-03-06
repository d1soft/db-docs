import { Schema } from '../interfaces';
import { TemplaterConfig } from './TemplaterConfig';

export interface Templater {

  /**
   * Build output from templater using schema data
   * 
   * @param schema Schema structure
   * @param outputPath Templater output path
   */
  build(schema: Schema, config: TemplaterConfig): Promise<void>;
}