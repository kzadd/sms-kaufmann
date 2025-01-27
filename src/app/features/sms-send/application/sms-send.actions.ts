import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { SmsSendIndividual, SmsSendMassive } from '../domain/sms-send.entity'

/**
 * Actions for managing sms send data.
 */
export const smsSendActions = createActionGroup({
  events: {
    'Clear error': emptyProps(),
    'Send sms individual': props<{ smsSend: SmsSendIndividual }>(),
    'Send sms individual failure': props<{ error: AppError }>(),
    'Send sms individual success': emptyProps(),
    'Send sms massive': props<{ smsSend: SmsSendMassive }>(),
    'Send sms massive failure': props<{ error: AppError }>(),
    'Send sms massive success': emptyProps()
  },
  source: 'SmsSend'
})
