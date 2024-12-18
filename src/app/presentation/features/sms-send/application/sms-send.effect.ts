import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, of } from 'rxjs'

import { ToastService } from '@shared/components/commons/toast/infrastructure/toast.service'
import { createError } from '@shared/exceptions/create-error.exception'
import { ApiSmsSendRepository } from '../infrastructure/sms-send.service'
import { onSmsSend, onSmsSendError, onSmsSendSuccess } from './sms-send.actions'

@Injectable()
export class SmsSendEffect {
  private _actions = inject(Actions)
  private _apiSmsSendRepository = inject(ApiSmsSendRepository)
  private _toastService = inject(ToastService)

  /**
   * Effect for the sms send.
   */
  onloadSmsSend$ = createEffect(() =>
    this._actions.pipe(
      ofType(onSmsSend),
      concatMap(sms =>
        this._apiSmsSendRepository.postSmsSend(sms).pipe(
          map(() => {
            this._toastService.show({ message: 'SMS enviado correctamente', severity: 'success' })

            return onSmsSendSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const standardizedError = createError({
              originalError: error,
              reason: 'SOMETHING_WENT_WRONG_ERROR'
            }).toObject()

            return of(onSmsSendError({ error: standardizedError }))
          })
        )
      )
    )
  )
}
