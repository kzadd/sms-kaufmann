import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { LoginCredentials } from '../domain/login.entity'
import { LoginError } from './login.types'

/**
 * Actions for the login.
 */
const loginActions = createActionGroup({
  events: {
    onClearState: emptyProps(),
    onGetToken: props<LoginCredentials>(),
    onGetTokenError: props<LoginError>(),
    onGetTokenSuccess: emptyProps()
  },
  source: 'login'
})

export const { onClearState, onGetToken, onGetTokenError, onGetTokenSuccess } = loginActions
