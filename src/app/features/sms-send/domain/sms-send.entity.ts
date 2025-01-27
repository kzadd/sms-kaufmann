import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface SmsSendIndividual {
  message: string
  phone: string
}

export type SmsSendIndividualForm = FormControlGroup<SmsSendIndividual>
export type SmsSendIndividualKey = Extract<keyof SmsSendIndividual, string>

export interface SmsSendMassive {
  file: File | null
}

export type SmsSendMassiveForm = FormControlGroup<SmsSendMassive>
export type SmsSendMassiveKey = Extract<keyof SmsSendMassive, string>

export interface SmsSendState {
  error: AppError | null
  loading: boolean
}
