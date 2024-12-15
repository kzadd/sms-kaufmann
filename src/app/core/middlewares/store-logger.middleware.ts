import { Action, ActionReducer } from '@ngrx/store'

import { ENVIRONMENT } from '@shared/configs/environment.config'

/**
 * Middleware that logs the state changes and actions to the console.
 */
export const storeLogger =
  <S, A extends Action>(reducer: ActionReducer<S, A>): ActionReducer<S, A> =>
  (state, action) => {
    if (ENVIRONMENT !== 'prod') {
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
