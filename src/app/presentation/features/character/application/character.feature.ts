import { createFeature, createReducer, on } from '@ngrx/store'

import { onGetCharacters, onGetCharactersError, onGetCharactersSuccess } from './character.actions'
import { CharacterState } from './character.types'

const initialState: CharacterState = {
  characters: [],
  error: null,
  loading: false
}

/**
 * The feature responsible for handling character actions.
 */
export const characterFeature = createFeature({
  name: 'character',
  reducer: createReducer(
    initialState,
    on(onGetCharacters, state => ({
      ...state,
      loading: true
    })),
    on(onGetCharactersError, (state, payload) => ({
      ...state,
      error: payload.error,
      loading: false
    })),
    on(onGetCharactersSuccess, (state, payload) => ({
      ...state,
      characters: payload.characters,
      loading: false
    }))
  )
})
