import { FormControl } from '@angular/forms'

export type FormControlGroup<T> = {
  [Key in keyof T]: FormControl<T[Key]>
}
