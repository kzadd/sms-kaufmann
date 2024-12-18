import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { PushSend } from '../domain/push-send.entity'
import { PushSendError } from './push-send.types'

/**
 * Actions for the push send.
 */
const pushSendActions = createActionGroup({
  events: {
    onClearState: emptyProps(),
    onPushSend: props<PushSend>(),
    onPushSendError: props<PushSendError>(),
    onPushSendSuccess: emptyProps()
  },
  source: 'push-send'
})

export const { onClearState, onPushSend, onPushSendError, onPushSendSuccess } = pushSendActions
