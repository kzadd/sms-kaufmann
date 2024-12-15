import { env } from '@environments/environment'

/**
 * Environment configuration.
 * Stores the API base URL and the current environment mode (e.g., development, production).
 */
export const { API_BASE_URL = '', BASE_URL = '/', ENABLE_MOCKING = false, ENVIRONMENT = 'local' } = env
