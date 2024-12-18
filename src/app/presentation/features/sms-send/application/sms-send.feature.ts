import { createFeature, createReducer, on } from '@ngrx/store'

import { onClearState, onSmsSend, onSmsSendError, onSmsSendSuccess } from './sms-send.actions'
import { SmsSendState } from './sms-send.types'

const initialState: SmsSendState = {
  error: null,
  loading: false,
  success: false
}

/**
 * The feature responsible for handling sms send actions.
 */
export const smsSendFeature = createFeature({
  name: 'sms-send',
  reducer: createReducer(
    initialState,
    on(onClearState, () => ({
      ...initialState
    })),
    on(onSmsSend, state => ({
      ...state,
      error: null,
      loading: true,
      success: false
    })),
    on(onSmsSendError, (state, payload) => ({
      ...state,
      error: payload.error,
      loading: false,
      success: false
    })),
    on(onSmsSendSuccess, state => ({
      ...state,
      error: null,
      loading: false,
      success: true
    }))
  )
})
