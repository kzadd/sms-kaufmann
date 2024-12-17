import { delay, http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@shared/configs/environment.config'

interface LoginRequest {
  email: string
  password: string
}

const ADMIN_EMAIL = 'test@admin.com'
const ADMIN_PASSWORD = '123456'

/**
 * Login mock handlers.
 */
export const loginMock = [
  http.post(`${API_BASE_URL}/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequest

    await delay(1000)

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
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
