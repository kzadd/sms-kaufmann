import { BaseError } from '@shared/types/exception.types'
import { Character } from '../domain/character.entity'

export interface CharacterApiResponse {
  informacion: {
    cantidad: number
    paginas: number
  }
  resultados: {
    especie: string
    estado: string
    genero: string
    id: string
    nombre: string
    tipo: string
  }[]
}

export interface CharacterError {
  error: BaseError
}

export interface CharacterState {
  characters: Character[]
  error: BaseError | null
  loading: boolean
}

export interface CharacterSuccess {
  characters: Character[]
}
