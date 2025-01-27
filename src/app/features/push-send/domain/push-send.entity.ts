import { SENDING_MODE } from '@app/shared/constants/app.constant'
import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface PushSendIndividual {
  app: string
  dni: string
  id: SENDING_MODE.INDIVIDUAL
  message: string
}

export type PushSendIndividualForm = FormControlGroup<PushSendIndividual>

export interface PushSendMassive {
  app: string
  file: File
  id: SENDING_MODE.MASSIVE
}

export type PushSendMassiveForm = FormControlGroup<PushSendMassive>

export interface PushSendState {
  error: AppError | null
  loading: boolean
}
