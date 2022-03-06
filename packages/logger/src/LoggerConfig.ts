import { LogLevel } from './LogLevel';
import { Format } from './Format';

export interface LoggerConfig {
  format: Format;
  level: LogLevel;
}
