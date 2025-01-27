import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { LoginAuth } from '../domain/login.entity'

/**
 * Actions for managing login data.
 */
export const loginActions = createActionGroup({
  events: {
    'Clear error': emptyProps(),
    SignIn: props<{ login: LoginAuth }>(),
    'SignIn failure': props<{ error: AppError }>(),
    'SignIn success': emptyProps()
  },
  source: 'Login'
})
