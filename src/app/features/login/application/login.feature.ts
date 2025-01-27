import { createFeature, createReducer, on } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { LoginState } from '../domain/login.entity'
import { loginActions } from './login.actions'

const initialState: LoginState = {
  error: null,
  loading: false
}

const defaultErrorState = (state: LoginState, payload: { error: AppError }): LoginState => ({
  ...state,
  error: payload.error,
  loading: false
})

const defaultLoadingState = (state: LoginState): LoginState => ({
  ...state,
  error: null,
  loading: true
})

/**
 * Feature that manages login related state and actions.
 */
export const loginFeature = createFeature({
  name: 'login',
  reducer: createReducer(
    initialState,
    on(loginActions.clearError, state => ({
      ...state,
      error: null
    })),
    on(loginActions.signIn, defaultLoadingState),
    on(loginActions.signInFailure, defaultErrorState),
    on(loginActions.signInSuccess, state => ({
      ...state,
      loading: false
    }))
  )
})
