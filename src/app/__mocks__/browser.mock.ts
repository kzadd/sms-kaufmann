import { setupWorker } from 'msw/browser'

/**
 * Mock worker for the browser.
 */
export const worker = setupWorker()
