import { delay, http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@shared/configs/environment.config'
import { CREDENTIALS_TEST_EMAIL, CREDENTIALS_TEST_PASSWORD } from '@shared/constants/app.constant'

interface LoginRequest {
  email: string
  password: string
}

/**
 * Login mock handlers.
 */
export const loginMock = [
  http.post(`${API_BASE_URL}/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequest

    await delay(1000)

    if (email === CREDENTIALS_TEST_EMAIL && password === CREDENTIALS_TEST_PASSWORD) {
      const successResponse = {
        errors: null,
        payload: {
          access_token: '2b094f5c53474865b9c6f49fbb3f9030'
        },
        success: 'OK'
      }

      return HttpResponse.json(successResponse, { status: 200 })
    }

    const errorResponse = {
      errors: ['Email or password incorrect'],
      payload: null,
      success: 'NOK'
    }

    return HttpResponse.json(errorResponse, { status: 401 })
  })
]
