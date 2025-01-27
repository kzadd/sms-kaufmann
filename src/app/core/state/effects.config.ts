import { PushSendEffect } from '@app/features/push-send'
import { SmsSendEffect } from '@app/features/sms-send'

/**
 * Root effects array for NgRx state management.
 * Handles side effects like API calls and async operations.
 */
export const effects = [PushSendEffect, SmsSendEffect]
