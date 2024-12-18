import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, of } from 'rxjs'

import { ToastService } from '@shared/components/commons/toast/infrastructure/toast.service'
import { createError } from '@shared/exceptions/create-error.exception'
import { ApiPushSendRepository } from '../infrastructure/push-send.service'
import { onPushSend, onPushSendError, onPushSendSuccess } from './push-send.actions'

@Injectable()
export class PushSendEffect {
  private _actions = inject(Actions)
  private _apiPushSendRepository = inject(ApiPushSendRepository)
  private _toastService = inject(ToastService)

  /**
   * Effect for the push send.
   */
  onloadPushSend$ = createEffect(() =>
    this._actions.pipe(
      ofType(onPushSend),
      concatMap(push =>
        this._apiPushSendRepository.postPushSend(push).pipe(
          map(() => {
            this._toastService.show({ message: 'Push enviado correctamente', severity: 'success' })

            return onPushSendSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const standardizedError = createError({
              originalError: error,
              reason: 'SOMETHING_WENT_WRONG_ERROR'
            }).toObject()

            return of(onPushSendError({ error: standardizedError }))
          })
        )
      )
    )
  )
}
