/**
 * Application Environment Configuration
 * Centralized environment variables and runtime settings.
 */

export type Environment = 'development' | 'staging' | 'production';

export interface AppConfig {
  readonly appName: string;
  readonly env: Environment;
  readonly apiBaseUrl: string;
  readonly apiTimeout: number;
  readonly enableLogging: boolean;
  readonly apiVersion: string;
}

const isDev = __DEV__;

export const config: AppConfig = {
  appName: 'Neyora',
  env: isDev ? 'development' : 'production',
  apiBaseUrl: isDev ? 'https://api.dev.neyora.com' : 'https://api.neyora.com',
  apiTimeout: 15000,
  enableLogging: isDev,
  apiVersion: 'v1',
};

export default config;
