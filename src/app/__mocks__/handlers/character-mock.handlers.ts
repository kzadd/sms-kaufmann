import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@shared/configs/environment.config'

/**
 * characterMock handlers for the API.
 */
export const characterMock = [
  http.get(`${API_BASE_URL}/character`, () => {
    const response = {
      errors: null,
      payload: {
        informacion: {
          cantidad: 1,
          paginas: 1
        },
        resultados: [
          {
            especie: 'Humano',
            estado: 'Vivo',
            genero: 'Masculino',
            id: '1',
            nombre: 'Rick Sanchez',
            tipo: ''
          },
          {
            especie: 'Humano',
            estado: 'Vivo',
            genero: 'Masculino',
            id: '2',
            nombre: 'Morty Smith',
            tipo: ''
          },
          {
            especie: 'Humano',
            estado: 'Vivo',
            genero: 'Masculino',
            id: '3',
            nombre: 'Summer Smith',
            tipo: ''
          }
        ]
      },
      success: 'OK'
    }

    return HttpResponse.json(response)
  })
]
