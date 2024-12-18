import { LoginEffect } from '@presentation/features/login'
import { PushSendEffect } from '@presentation/features/push-send'
import { SmsSendEffect } from '@presentation/features/sms-send'

/**
 * Combines all effects into a single root effect.
 * This function is used to manage the overall state structure by combining individual effects.
 */
export const effects = [LoginEffect, PushSendEffect, SmsSendEffect]
