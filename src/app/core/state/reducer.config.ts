import { loginFeature } from '@presentation/features/login'

/**
 * Combines all reducers into a single root reducer.
 * This function is used to manage the overall state structure by combining individual reducers.
 */
export const reducer = {
  [loginFeature.name]: loginFeature.reducer
}
