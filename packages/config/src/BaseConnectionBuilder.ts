import { ExternalVariableMatcher, ExternalVariableSanitazer } from './Utils';

/**
 * @class BaseConnectionBuilder
 * @description Fill connection config
 */
export abstract class BaseConnectionBuilder {
  constructor(public readonly name: string) {}

  public fill(connection: string, getValue: (name: string) => string | undefined): string {
    const variables = connection.match(ExternalVariableMatcher);

    if (!variables) {
      throw new Error(
        `Configurator: Incorrect connection template <${connection}>`
      );
    }

    return variables.reduce((current: string, variable: string) => {
      const name = variable.replace(ExternalVariableSanitazer, '');
      const value = getValue(name);

      if (!value) {
        throw new Error(
          `${this.name}: Can't find variable "${name}" at passed config file`
        );
      }

      return current.replace(variable, value);
    }, connection);
  }
}
