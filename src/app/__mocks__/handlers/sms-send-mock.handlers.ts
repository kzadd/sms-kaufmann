import { delay, http, HttpResponse } from 'msw'

import { isSmsSendIndividual, SmsSend } from '@presentation/features/sms-send'
import { API_BASE_URL } from '@shared/configs/environment.config'

/**
 * Sms send mock handlers.
 */
export const smsSendMock = [
  http.post(`${API_BASE_URL}/sms-send`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    const sms = (await request.json()) as SmsSend

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
      payload: { status: isSmsSendIndividual(sms) ? 'sent individual' : 'sent massive' },
      success: 'OK'
    }

    return HttpResponse.json(successResponse, { status: 200 })
  })
]
