import { createFeature, createReducer, on } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { SmsSendState } from '../domain/sms-send.entity'
import { smsSendActions } from './sms-send.actions'

const initialState: SmsSendState = {
  error: null,
  loading: false
}

const defaultErrorState = (state: SmsSendState, payload: { error: AppError }): SmsSendState => ({
  ...state,
  error: payload.error,
  loading: false
})

const defaultLoadingState = (state: SmsSendState): SmsSendState => ({
  ...state,
  error: null,
  loading: true
})

/**
 * Feature that manages sms send related state and actions.
 */
export const smsSendFeature = createFeature({
  name: 'smsSend',
  reducer: createReducer(
    initialState,
    on(smsSendActions.clearError, state => ({
      ...state,
      error: null
    })),
    on(smsSendActions.sendSmsIndividual, defaultLoadingState),
    on(smsSendActions.sendSmsIndividualFailure, defaultErrorState),
    on(smsSendActions.sendSmsIndividualSuccess, state => ({
      ...state,
      loading: false
    })),
    on(smsSendActions.sendSmsMassive, defaultLoadingState),
    on(smsSendActions.sendSmsMassiveFailure, defaultErrorState),
    on(smsSendActions.sendSmsMassiveSuccess, state => ({
      ...state,
      loading: false
    }))
  )
})
