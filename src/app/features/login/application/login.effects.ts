import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, of } from 'rxjs'

import { TOKEN_KEYS } from '@app/shared/constants/app.constant'
import { createError } from '@app/shared/exceptions/create-error.exception'
import { putCookie } from '@app/shared/utils/cookie.utils'
import { ApiLoginRepository } from '../infrastructure/login.service'
import { loginActions } from './login.actions'

@Injectable()
export class LoginEffect {
  private _actions = inject(Actions)
  private _apiLoginRepository = inject(ApiLoginRepository)

  /**
   * Effect that handles login thunk.
   */
  loginThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(loginActions.signIn),
      concatMap(({ login }) => {
        return this._apiLoginRepository.signIn(login).pipe(
          map(({ data }) => {
            if (!data.JWTToken) {
              throw new Error('INVALID_CREDENTIALS_ERROR')
            }

            putCookie(TOKEN_KEYS.accessToken, data.JWTToken)

            return loginActions.signInSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(loginActions.signInFailure(failureResponse))
          })
        )
      })
    )
  })
}
