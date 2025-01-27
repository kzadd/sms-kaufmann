import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastrService } from 'ngx-toastr'
import { catchError, concatMap, map, of } from 'rxjs'

import { createError } from '@app/shared/exceptions/create-error.exception'
import { ApiSmsSendRepository } from '../infrastructure/sms-send.service'
import { smsSendActions } from './sms-send.actions'

@Injectable()
export class SmsSendEffect {
  private _actions = inject(Actions)
  private _apiSmsSendRepository = inject(ApiSmsSendRepository)
  private _toast = inject(ToastrService)

  /**
   * Effect that handles sms send individual thunk.
   */
  smsSendIndividualThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(smsSendActions.sendSmsIndividual),
      concatMap(({ smsSend }) => {
        return this._apiSmsSendRepository.sendSmsIndividual(smsSend).pipe(
          map(() => {
            this._toast.success('¡Excelente! El mensaje se ha enviado correctamente.', 'SMS Individual')

            return smsSendActions.sendSmsIndividualSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(smsSendActions.sendSmsIndividualFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles sms send massive thunk.
   */
  smsSendMassiveThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(smsSendActions.sendSmsMassive),
      concatMap(({ smsSend }) => {
        return this._apiSmsSendRepository.sendSmsMassive(smsSend).pipe(
          map(() => {
            this._toast.success('¡Excelente! El mensaje se ha enviado correctamente.', 'SMS Masivo')

            return smsSendActions.sendSmsMassiveSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(smsSendActions.sendSmsMassiveFailure(failureResponse))
          })
        )
      })
    )
  })
}
