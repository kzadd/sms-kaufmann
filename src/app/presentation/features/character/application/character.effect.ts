import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, of } from 'rxjs'

import { createError } from '@shared/exceptions/create-error.exception'
import { CharacterAdapter } from '../infrastructure/character.adapter'
import { ApiCharacterRepository } from '../infrastructure/character.service'
import { onGetCharacters, onGetCharactersError, onGetCharactersSuccess } from './character.actions'

@Injectable()
export class CharacterEffect {
  private _actions = inject(Actions)
  private _apiCharacterRepository = inject(ApiCharacterRepository)

  /**
   * Effect for the character.
   */
  onloadCharacters$ = createEffect(() =>
    this._actions.pipe(
      ofType(onGetCharacters),
      concatMap(() =>
        this._apiCharacterRepository.getCharacters().pipe(
          map(characterResponse => {
            const adapterCharacters = CharacterAdapter.toCharacters(characterResponse)

            return onGetCharactersSuccess({ characters: adapterCharacters })
          }),
          catchError((error: HttpErrorResponse) => {
            const standardizedError = createError({
              originalError: error,
              reason: 'SOMETHING_WENT_WRONG_ERROR'
            }).toObject()

            return of(onGetCharactersError({ error: standardizedError }))
          })
        )
      )
    )
  )
}
