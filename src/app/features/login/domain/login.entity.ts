import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface LoginApiResponse {
  JWTToken: string
}

export interface LoginAuth {
  password: string
  username: string
}

export type LoginAuthForm = FormControlGroup<LoginAuth>
export type LoginAuthKey = Extract<keyof LoginAuth, string>

export interface LoginState {
  error: AppError | null
  loading: boolean
}
