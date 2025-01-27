import { createFeature, createReducer, on } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { PushSendState } from '../domain/push-send.entity'
import { pushSendActions } from './push-send.actions'

const initialState: PushSendState = {
  error: null,
  loading: false
}

const defaultErrorState = (state: PushSendState, payload: { error: AppError }): PushSendState => ({
  ...state,
  error: payload.error,
  loading: false
})

const defaultLoadingState = (state: PushSendState): PushSendState => ({
  ...state,
  error: null,
  loading: true
})

/**
 * Feature that manages push send related state and actions.
 */
export const pushSendFeature = createFeature({
  name: 'pushSend',
  reducer: createReducer(
    initialState,
    on(pushSendActions.clearError, state => ({
      ...state,
      error: null
    })),
    on(pushSendActions.sendPushIndividual, defaultLoadingState),
    on(pushSendActions.sendPushIndividualFailure, defaultErrorState),
    on(pushSendActions.sendPushIndividualSuccess, state => ({
      ...state,
      loading: false
    })),
    on(pushSendActions.sendPushMassive, defaultLoadingState),
    on(pushSendActions.sendPushMassiveFailure, defaultErrorState),
    on(pushSendActions.sendPushMassiveSuccess, state => ({
      ...state,
      loading: false
    }))
  )
})
