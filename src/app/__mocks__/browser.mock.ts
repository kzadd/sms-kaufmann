import { setupWorker } from 'msw/browser'

import { loginMock } from './handlers/login-mock.handlers'
import { pushSendMock } from './handlers/push-send-mock.handlers'
import { smsSendMock } from './handlers/sms-send-mock.handlers'

/**
 * Mock worker for the browser.
 */
export const worker = setupWorker(...loginMock, ...pushSendMock, ...smsSendMock)
