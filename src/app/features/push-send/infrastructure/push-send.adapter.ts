import { PushSendApplication, PushSendApplicationApiResponse, PushSendApplicationDto } from '../domain/push-send.entity'

/**
 * Adapts the API response to the PushSendApplication domain model.
 */
export const pushSendApplicationAdapter = (response: PushSendApplicationDto): PushSendApplication => ({
  appId: response.ConfigPropertyAppId,
  name: response.ConfigPropertyNombre,
  restApi: response.ConfigPropertyRestApi
})

/**
 * Adapts the API response to the PushSendApplications domain model.
 */
export const pushSendApplicationsAdapter = (response: PushSendApplicationApiResponse): PushSendApplication[] => {
  return response.data.map((application: PushSendApplicationDto) => pushSendApplicationAdapter(application))
}
