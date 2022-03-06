import { readFile as nodeReadFile, access } from 'fs/promises';
import { resolve } from 'path';

export const ConnectionStringMatcher = /(?<adapter>mysql):\/\/(.*)(:(.*))?@(.*)(:(.*))?\/(?<dbname>.*)/;
export const ExternalVariableMatcher = /\{(.*?)\}/gm;
export const ExternalVariableSanitazer = /[\{\}]/g;
export const ProcessEnvVariableMatcher = /(\[\[)(.*?)(\]\])/gm;
export const ProcessEnvVariableSanitazer = /[\[\[\]\]]/g;

export async function parseJson<T>(file: string): Promise<T> {
  const path = resolve(file);

  try {
    const content = await nodeReadFile(path);
    return JSON.parse(content.toString());
  } catch(e: unknown) {
    throw new Error(`Cannot parse json file: '${path}' - ${(<Error>e).message}`);
  }
}

export async function readFile(file: string): Promise<string> {
  const path = resolve(file);
  try {
    const content = await nodeReadFile(path);
    return content.toString();
  } catch(e: unknown) {
    throw new Error(`Cannot read file: '${path}' - ${(<Error>e).message}`);
  }
}

export function setProcessEnvVariables(config: string): string {
  const variables = config.match(ProcessEnvVariableMatcher);
  if (variables === null) {
    return config;
  }

  return variables.reduce((current: string, variable: string) => {
    const name = variable.replace(ProcessEnvVariableSanitazer, '');
    const value = process.env[name];

    if (typeof value === 'undefined') {
      throw new Error(
        `JsonConnectionBuilder. Can't find variable "${name}" at process.env`
      );
    }
    return current?.replace(variable, value);
  }, config);
}

export async function parseJsonAndFillProcessEnv<T>(file: string): Promise<T> {
  const filePath = resolve(file);
  let result;
  try {
    const content = await readFile(filePath);
    const filled = setProcessEnvVariables(content);
    result = JSON.parse(filled);
  } catch (e: unknown) {
    throw new Error(`Cannot parse json file: ${filePath}.\n${(<Error>e).message}\n${(<Error>e).stack}`);
  }

  return result;
}

export async function isModuleInstalled(name: string) {
  try {
    await access(require.resolve(name));
    return true;
  } catch (e) {
    return false;
  }
}