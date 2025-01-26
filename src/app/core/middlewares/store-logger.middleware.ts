import { Action, ActionReducer } from '@ngrx/store'

import { env } from '@app/shared/configs/environment.config'

/**
 * Logs NgRx state changes and actions to console in local mode.
 * Helps debug application state flow and track actions dispatched.
 */
export const storeLogger =
  <S, A extends Action>(reducer: ActionReducer<S, A>): ActionReducer<S, A> =>
  (state, action) => {
    if (env.MODE !== 'production') {
      console.group(`NgRx Action: ${action.type}`)
      console.log('%c Previous State:', 'color: #FF0000; font-weight: bold', state)
      console.log('%c Action:', 'color: #03A9F4; font-weight: bold', action)

      const nextState = reducer(state, action)

      console.log('%c Next State:', 'color: #4CAF50; font-weight: bold', nextState)
      console.groupEnd()

      return nextState
    }

    return reducer(state, action)
  }
