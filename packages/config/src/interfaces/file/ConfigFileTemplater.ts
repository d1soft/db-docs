/**
 * Templaters configuration
 */
export interface ConfigFileTemplater {
  /**
   * Templater name
   */
  [name: string]: {
    /**
     * Path to template file
     */
    template?: string;

    /**
     * Custom output name
     */
    outputName?: string;
  };
};
