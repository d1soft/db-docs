import { LogLevel } from './LogLevel';

/**
 * Logger interface
 */
export interface Logger {

  /**
   * Creates info log reply
   * 
   * @param message Message
   * @param category Category
   * @param data Additional data
   */
  info(message: string, category?: string, ...data: any[]): void;

  /**
   * Creates warn log reply
   * 
   * @param message Message
   * @param category Category
   * @param data Additional data
   */
  warn(message: string, category?: string, ...data: any[]): void;

  /**
   * Creates debug log reply
   * 
   * @param message Message
   * @param category Category
   * @param data Additional data
   */
  debug(message: string, category?: string, ...data: any[]): void;

  /**
   * Creates error log reply
   * 
   * @param message Message
   * @param category Category
   * @param data Additional data
   */
  error(message: string, category?: string, ...data: any[]): void;

  /**
   * Creates fatal log reply
   * 
   * @param message Message
   * @param category Category
   * @param data Additional data
   */
  fatal(message: string, category?: string, ...data: any[]): void;

  
  /**
   * Creates log reply
   * 
   * @param level Log level
   * @param message Message
   * @param category Category
   * @param data Additional data
   */
  log(level: LogLevel, message: string, category?: string, ...data: any[]): void;
}
