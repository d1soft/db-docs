import { Signale } from 'signale';
import type { Logger } from '../Logger';
import type { LoggerConfig } from '../LoggerConfig';
import { LogLevel } from '../LogLevel';
import { Format } from '../Format';
import type { SignaleLoggerLevel } from './SignaleLoggerLevel';

export class SignaleLogger implements Logger {
  private readonly logger: Signale;
  private readonly signaleMap: SignaleLoggerLevel;

  constructor(private readonly config?: Partial<LoggerConfig>) {
    this.logger = new Signale({
      config: {
        displayTimestamp: true,
      },
    });

    this.signaleMap = {
      [LogLevel.Debug]: 'debug',
      [LogLevel.Info]: 'info',
      [LogLevel.Warn]: 'warn',
      [LogLevel.Error]: 'error',
      [LogLevel.Fatal]: 'fatal',
    };
  }
  
  public log(level: LogLevel, message: string, category?: string, ...data: any[]): void {
    if (level < (this.config?.level || LogLevel.Info))
      return;

    const method = this.logger[this.signaleMap[level]];
    if (this.config?.format === Format.Json) {
      method(
        this.jsonify(message, category, data)
      );
    }

    method(`${category}. ${message}${data}`);
  }

  public debug(message: string, category?: string, ...data: any[]): void {
    this.log(LogLevel.Debug, message, category, data);
  }

  public info(message: string, category?: string, ...data: any[]): void {
    this.log(LogLevel.Info, message, category, data);
  }

  public warn(message: string, category?: string, ...data: any[]): void {
    this.log(LogLevel.Warn, message, category, data);
  }

  public error(message: string, category?: string, ...data: any[]): void {
    this.log(LogLevel.Error, message, category, data);
  }

  public fatal(message: string, category?: string, ...data: any[]): void {
    this.log(LogLevel.Fatal, message, category, data);
  }

  private jsonify(message: string, category?: string, ...data: any[]) {
    return JSON.stringify({ category, message, ...data });
  }
}
