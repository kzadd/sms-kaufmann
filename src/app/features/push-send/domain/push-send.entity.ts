import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface PushSendApplication {
  appId: string
  name: string
  restApi: string
}

export interface PushSendApplicationApiResponse {
  data: PushSendApplicationDto[]
}

export interface PushSendApplicationDto {
  ConfigPropertyAppId: string
  ConfigPropertyNombre: string
  ConfigPropertyRestApi: string
}

export interface PushSendIndividual {
  app: string
  dni: string
  message: string
}

export type PushSendIndividualForm = FormControlGroup<PushSendIndividual>
export type PushSendIndividualKey = Extract<keyof PushSendIndividual, string>

export interface PushSendMassive {
  app: string
  file: File | null
}

export type PushSendMassiveForm = FormControlGroup<PushSendMassive>
export type PushSendMassiveKey = Extract<keyof PushSendMassive, string>

export interface PushSendState {
  applications: PushSendApplication[]
  error: AppError | null
  loading: boolean
}
