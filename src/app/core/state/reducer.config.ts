import { pushSendFeature } from '@app/features/push-send'
import { smsSendFeature } from '@app/features/sms-send'

/**
 * Root reducer that combines all feature reducers into a single state tree.
 * Manages the entire application state through NgRx store.
 */
export const reducer = {
  pushSend: pushSendFeature.reducer,
  smsSend: smsSendFeature.reducer
}
