import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { LoginCredentials } from '../domain/login.entity'
import { LoginError } from './login.types'

/**
 * Actions for the login.
 */
const loginActions = createActionGroup({
  events: {
    onClearLoginError: emptyProps(),
    onGetToken: props<LoginCredentials>(),
    onGetTokenError: props<LoginError>(),
    onGetTokenSuccess: emptyProps()
  },
  source: 'login'
})

export const { onClearLoginError, onGetToken, onGetTokenError, onGetTokenSuccess } = loginActions
