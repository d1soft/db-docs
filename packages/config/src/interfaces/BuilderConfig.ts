/**
 * Configuration builders config
 */
export interface BuilderConfig {
  /**
   * Path to third-party config (.json, .env file)
   */
  path: string;

  /**
   * Connection template with keys from third-party config
   */
  connection: string;

  /**
   * Connection builder options
   */
  options?: Record<string, any>;
}
