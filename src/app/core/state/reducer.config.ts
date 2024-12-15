import { characterFeature } from '@presentation/features/character'

/**
 * Combines all reducers into a single root reducer.
 * This function is used to manage the overall state structure by combining individual reducers.
 */
export const reducer = {
  [characterFeature.name]: characterFeature.reducer
}
