import { ENABLE_MOCKING } from '@shared/configs/environment.config'

/**
 * Initializes mock service workers if the environment variable `enableMocking` is set to 'true'.
 */
export const initializeMockServiceWorker = async () => {
  if (!ENABLE_MOCKING) return

  const { worker } = await import('./browser.mock')

  return worker.start()
}
