import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

const errorMessages = {
  email: 'Ingrese un correo electrónico válido.',
  maxLength: (length: number) => `Este campo no puede exceder los ${length} caracteres.`,
  minLength: (length: number) => `Este campo debe tener al menos ${length} caracteres.`,
  number: 'Este campo solo acepta números.',
  phoneNumber: 'Ingrese un número de teléfono válido',
  required: 'Este campo es obligatorio.',
  rut: 'Ingrese un RUT válido sin puntos y con guión.'
}

/**
 * Custom validator to check if input value is a valid Chilean phone number.
 * Format: 56 + 9 + 8 digits (e.g. 56975833156)
 */
export const isChileanPhone: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null

  const phoneRegex = /^56(9)\d{8}$/
  const isValid = phoneRegex.test(control.value.trim())

  const error = {
    phoneNumber: errorMessages.phoneNumber
  }

  return isValid ? null : error
}

/**
 * Custom validator to check if input value is a valid Chilean RUT.
 * Format: 12345678-9
 */
export const isChileanRut: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null

  const rutRegex = /^[0-9]{7,8}-[0-9K]$/

  if (!rutRegex.test(control.value)) {
    return { rut: errorMessages.rut }
  }

  const [rutDigits, dv] = control.value.split('-')

  let sum = 0
  let multiplier = 2

  for (let i = rutDigits.length - 1; i >= 0; i--) {
    sum += parseInt(rutDigits[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const expectedDV = 11 - (sum % 11)
  const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString()

  const error = {
    rut: errorMessages.rut
  }

  return dv === calculatedDV ? null : error
}

/**
 * Custom validator to check if input value is a valid email address.
 */
export const isEmail: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const isValid = emailRegex.test(control.value.trim())

  const error = {
    email: errorMessages.email
  }

  return isValid ? null : error
}

/**
 * Custom validator to check if input value contains only numeric characters.
 */
export const isNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null

  const numericRegex = /^[0-9]+$/
  const isValid = numericRegex.test(control.value.trim())

  const error = {
    number: errorMessages.number
  }

  return isValid ? null : error
}

/**
 * Custom validator to check if input field has a non-empty value.
 */
export const isRequired: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isValid = control.value && control.value.trim().length

  const error = {
    required: errorMessages.required
  }

  return isValid ? null : error
}

/**
 * Custom validator factory that creates a validator to check maximum length.
 */
export const maxLength = (length: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null

    const isValid = control.value.trim().length <= length

    const error = {
      maxlength: errorMessages.maxLength(length)
    }

    return isValid ? null : error
  }
}

/**
 * Custom validator factory that creates a validator to check minimum length.
 */
export const minLength = (length: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null

    const isValid = control.value.trim().length >= length

    const error = {
      minlength: errorMessages.minLength(length)
    }

    return isValid ? null : error
  }
}
