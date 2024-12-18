import { createFeature, createReducer, on } from '@ngrx/store'

import { onClearState, onPushSend, onPushSendError, onPushSendSuccess } from './push-send.actions'
import { PushSendState } from './push-send.types'

const initialState: PushSendState = {
  error: null,
  loading: false,
  success: false
}

/**
 * The feature responsible for handling push send actions.
 */
export const pushSendFeature = createFeature({
  name: 'push-send',
  reducer: createReducer(
    initialState,
    on(onClearState, () => ({
      ...initialState
    })),
    on(onPushSend, state => ({
      ...state,
      error: null,
      loading: true,
      success: false
    })),
    on(onPushSendError, (state, payload) => ({
      ...state,
      error: payload.error,
      loading: false,
      success: false
    })),
    on(onPushSendSuccess, state => ({
      ...state,
      error: null,
      loading: false,
      success: true
    }))
  )
})
