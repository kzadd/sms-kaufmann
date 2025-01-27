import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastrService } from 'ngx-toastr'
import { catchError, concatMap, map, of } from 'rxjs'

import { createError } from '@app/shared/exceptions/create-error.exception'
import { ApiPushSendRepository } from '../infrastructure/push-send.service'
import { pushSendActions } from './push-send.actions'

@Injectable()
export class PushSendEffect {
  private _actions = inject(Actions)
  private _apiPushSendRepository = inject(ApiPushSendRepository)
  private _toast = inject(ToastrService)

  /**
   * Effect that handles push send individual thunk.
   */
  pushSendIndividualThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(pushSendActions.sendPushIndividual),
      concatMap(({ pushSend }) => {
        return this._apiPushSendRepository.sendPushIndividual(pushSend).pipe(
          map(() => {
            this._toast.success('¡Excelente! El mensaje se ha enviado correctamente.', 'Push Individual')

            return pushSendActions.sendPushIndividualSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(pushSendActions.sendPushIndividualFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles push send massive thunk.
   */
  pushSendMassiveThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(pushSendActions.sendPushMassive),
      concatMap(({ pushSend }) => {
        return this._apiPushSendRepository.sendPushMassive(pushSend).pipe(
          map(() => {
            this._toast.success('¡Excelente! El mensaje se ha enviado correctamente.', 'Push Masivo')

            return pushSendActions.sendPushMassiveSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(pushSendActions.sendPushMassiveFailure(failureResponse))
          })
        )
      })
    )
  })
}
