import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { SmsSend } from '../domain/sms-send.entity'
import { SmsSendError } from './sms-send.types'

/**
 * Actions for the sms send.
 */
const smsSendActions = createActionGroup({
  events: {
    onClearState: emptyProps(),
    onSmsSend: props<SmsSend>(),
    onSmsSendError: props<SmsSendError>(),
    onSmsSendSuccess: emptyProps()
  },
  source: 'sms-send'
})

export const { onClearState, onSmsSend, onSmsSendError, onSmsSendSuccess } = smsSendActions
