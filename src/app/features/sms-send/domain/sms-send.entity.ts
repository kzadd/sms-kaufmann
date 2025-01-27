import { SENDING_MODE } from '@app/shared/constants/app.constant'
import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface SmsSendIndividual {
  id: SENDING_MODE.INDIVIDUAL
  message: string
  phone: string
}

export type SmsSendIndividualForm = FormControlGroup<SmsSendIndividual>

export interface SmsSendMassive {
  id: SENDING_MODE.MASSIVE
  file: File
}

export type SmsSendMassiveForm = FormControlGroup<SmsSendMassive>

export interface SmsSendState {
  error: AppError | null
  loading: boolean
}
