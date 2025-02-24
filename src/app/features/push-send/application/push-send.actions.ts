import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { PushSendApplication, PushSendIndividual, PushSendMassive } from '../domain/push-send.entity'

/**
 * Actions for managing push send data.
 */
export const pushSendActions = createActionGroup({
  events: {
    'Clear error': emptyProps(),
    'Get applications': emptyProps(),
    'Get applications failure': props<{ error: AppError }>(),
    'Get applications success': props<{ applications: PushSendApplication[] }>(),
    'Send push individual': props<{ pushSend: PushSendIndividual }>(),
    'Send push individual failure': props<{ error: AppError }>(),
    'Send push individual success': emptyProps(),
    'Send push massive': props<{ pushSend: PushSendMassive }>(),
    'Send push massive failure': props<{ error: AppError }>(),
    'Send push massive success': emptyProps()
  },
  source: 'PushSend'
})
