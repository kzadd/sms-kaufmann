import { setupWorker } from 'msw/browser'

import { loginMock } from './handlers/login-mock.handlers'

/**
 * Mock worker for the browser.
 */
export const worker = setupWorker(...loginMock)
