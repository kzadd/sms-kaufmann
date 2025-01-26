import { AbstractControl, ValidationErrors } from '@angular/forms'

/**
 * Gets the first error message from a form control if it has errors and is invalid.
 */
export const getFormControlErrorMessage = (formControl: AbstractControl): string => {
  const hasErrors = formControl.errors && Object.keys(formControl.errors).length
  const isInvalidState = formControl.dirty || formControl.touched

  if (!hasErrors || !isInvalidState) return ''

  const [firstErrorKey] = Object.keys(formControl.errors as ValidationErrors)
  const errorMessage = formControl.errors?.[firstErrorKey] as string

  return errorMessage ?? ''
}
