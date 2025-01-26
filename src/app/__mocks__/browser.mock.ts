import { setupWorker } from 'msw/browser'

/**
 * Browser-side mock service worker.
 * Intercepts HTTP requests and returns mock responses for testing.
 */
export const worker = setupWorker()
