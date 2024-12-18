import { delay, http, HttpResponse } from 'msw'

import { isPushSendIndividual, PushSend } from '@presentation/features/push-send'
import { API_BASE_URL } from '@shared/configs/environment.config'

/**
 * Push send mock handlers.
 */
export const pushSendMock = [
  http.post(`${API_BASE_URL}/push-send`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    const push = (await request.json()) as PushSend

    await delay(1000)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const errorResponse = {
        errors: null,
        payload: null,
        success: 'NOK'
      }

      return HttpResponse.json(errorResponse, { status: 401 })
    }

    const successResponse = {
      errors: null,
      payload: { status: isPushSendIndividual(push) ? 'sent individual' : 'sent massive' },
      success: 'OK'
    }

    return HttpResponse.json(successResponse, { status: 200 })
  })
]
