#!/usr/bin/env node

import { Command } from 'commander';
import { CLIParams } from './CLIParams';
import { ConfigParser } from '@db-docs/config';
import { SignaleLogger, LogLevel, Format } from '@db-docs/logger';
import { DocsGenerator } from '@db-docs/core';
 
const logger = new SignaleLogger({
  level: process.env.DEBUG ? LogLevel.Debug : LogLevel.Info,
  /** todo: refactor this */
  format: ['json', 'text'].includes(process.env.FORMAT
    ? process.env.FORMAT.toLowerCase()
    : ''
  ) ? process.env.FORMAT as Format : Format.Text
});

function commaseparatedList(value: string) {
  return value.split(',');
}

function onError(err: Error) {
  logger.fatal(`${err.message}`, 'Startup');
  if (err.stack) {
    logger.debug(err.stack);
  }

  process.exit(1);
}

export async function cli(args: any) {
  new Command()
    .version('0.10.0')
    .description('Database schema documentation')
    .option('-d, --database <connection>', 'database connection string')
    .option('-c, --config <path>', 'config file path (schema-docs.json)')
    .option(
      '-t, --templaters <templaters>',
      'target templaters, comma-separated list of templaters names',
      commaseparatedList,
      ['json', 'html']
    )
    .option('-o, --output <path>', 'output files path', './schema-docs')
    .option(
      '-i, --ignore-tables <tables>',
      'ignore tables from database, comma-separated list',
      commaseparatedList,
      []
    )
    .option('-e, --erd', 'generate er-diagram', false)
    .action(async (params: CLIParams) => {
      if (!params.config && !params.database) {
        logger.fatal('Must be specified --config or --database option', 'Config');
        return process.exit(1);
      }

      if (!params.config) {
        logger.fatal('Must be specified --config or --database option', 'Config');
        return process.exit(1);
      }

      const configParser = new ConfigParser(params.config);
      const config = await configParser.parse();
      if (!config) {
        logger.fatal(`Can't parse config. Exit...`, 'Config');
        return process.exit(1);
      }
    
      new DocsGenerator(config, logger).generate()
        .then(process.exit(0));
    })
    .parse(args);
}

cli(process.argv).catch(onError);

process.on('uncaughtException', onError);