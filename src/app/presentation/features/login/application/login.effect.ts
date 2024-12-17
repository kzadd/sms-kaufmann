import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, of } from 'rxjs'

import { createError } from '@shared/exceptions/create-error.exception'
import { putCookie } from '@shared/utils/cookie.utils'
import { ApiLoginRepository } from '../infrastructure/login.service'
import { onGetToken, onGetTokenError, onGetTokenSuccess } from './login.actions'

@Injectable()
export class LoginEffect {
  private _actions = inject(Actions)
  private _apiLoginRepository = inject(ApiLoginRepository)
  private _router = inject(Router)

  /**
   * Effect for the login.
   */
  onloadLogin$ = createEffect(() =>
    this._actions.pipe(
      ofType(onGetToken),
      concatMap(({ email, password }) =>
        this._apiLoginRepository.getToken({ email, password }).pipe(
          map(response => {
            const { access_token } = response.data.payload

            putCookie('access_token', access_token)
            this._router.navigate(['/'])

            return onGetTokenSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const standardizedError = createError({
              originalError: error,
              reason: error.status === 401 ? 'UNAUTHORIZED_ERROR' : 'SOMETHING_WENT_WRONG_ERROR'
            }).toObject()

            return of(onGetTokenError({ error: standardizedError }))
          })
        )
      )
    )
  )
}
