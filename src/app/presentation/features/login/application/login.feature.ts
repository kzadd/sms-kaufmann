import { createFeature, createReducer, on } from '@ngrx/store'

import { onClearState, onGetToken, onGetTokenError, onGetTokenSuccess } from './login.actions'
import { LoginState } from './login.types'

const initialState: LoginState = {
  error: null,
  loading: false
}

/**
 * The feature responsible for handling login actions.
 */
export const loginFeature = createFeature({
  name: 'login',
  reducer: createReducer(
    initialState,
    on(onGetToken, state => ({
      ...state,
      error: null,
      loading: true
    })),
    on(onGetTokenError, (state, payload) => ({
      ...state,
      error: payload.error,
      loading: false
    })),
    on(onGetTokenSuccess, state => ({
      ...state,
      error: null,
      loading: false
    })),
    on(onClearState, () => ({
      error: null,
      loading: false
    }))
  )
})
