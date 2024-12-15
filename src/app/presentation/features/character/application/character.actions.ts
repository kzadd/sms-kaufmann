import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { CharacterError, CharacterSuccess } from './character.types'

/**
 * Actions for the character.
 */
const characterActions = createActionGroup({
  events: {
    onGetCharacters: emptyProps(),
    onGetCharactersError: props<CharacterError>(),
    onGetCharactersSuccess: props<CharacterSuccess>()
  },
  source: 'character'
})

export const { onGetCharacters, onGetCharactersError, onGetCharactersSuccess } = characterActions
