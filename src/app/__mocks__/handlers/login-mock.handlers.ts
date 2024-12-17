import { delay, http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@shared/configs/environment.config'

/**
 * loginMock handlers for the API.
 */
export const loginMock = [
  http.post(`${API_BASE_URL}/login`, async ({ request }) => {
    const { correo: email, contrasena: password } = (await request.json()) as { correo: string; contrasena: string }

    await delay(2000)

    if (email === 'admin@admin.com' && password === '123456') {
      const successResponse = {
        errors: null,
        payload: {
          access_token: 'testing'
        },
        success: 'OK'
      }

      return HttpResponse.json(successResponse, { status: 200 })
    }

    const errorResponse = {
      errors: ['Contraseña o correo incorrecto'],
      payload: null,
      success: 'NOK'
    }

    return HttpResponse.json(errorResponse, { status: 401 })
  })
]
