/**
 * Plugins base configuration.
 * 
 * Validates according to plugin metadata on startup.
 */
export interface ConfigFilePlugin {
  [name: string]: {
    [param: string]: string;
  }
}