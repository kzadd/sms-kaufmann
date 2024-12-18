import { loginFeature } from '@presentation/features/login'
import { smsSendFeature } from '@presentation/features/sms-send'

/**
 * Combines all reducers into a single root reducer.
 * This function is used to manage the overall state structure by combining individual reducers.
 */
export const reducer = {
  [loginFeature.name]: loginFeature.reducer,
  [smsSendFeature.name]: smsSendFeature.reducer
}
