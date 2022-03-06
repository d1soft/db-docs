export interface ConfigSSH {

  /**
   * SSH connection host
   */
  host: string;

  /**
   * SSH connection username
   */
  username: string;

  /**
   * SSH tunnel source host (more often is your localhost)
   */
  sourceHost: string;

  /**
   * SSH tunnel source port (more often is your localhost port)
   */
  sourcePort: number;

  /**
   * SSH tunnel database host on remote server (more often is localhost)
   */
  destinationHost: string;

  /**
   * SSH tunnel database port on remote server
   */
  destinationPort: number;

  /**
   * SSH connection port
   */
  port?: number;

  /**
   * SSH connection password
   */
  password?: string;

  /**
   * SSH private key path
   */
  privateKeyPath?: string;

  /**
   * SSH private key content
   * 
   * May be useful for CI/CD
   */
  privateKeyContent?: string;
}