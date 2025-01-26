import { FormControlGroup } from '@app/shared/types/form.types'

export interface LoginAuth {
  password: string
  username: string
}

export type LoginAuthForm = FormControlGroup<LoginAuth>
export type LoginAuthKey = Extract<keyof LoginAuth, string>
