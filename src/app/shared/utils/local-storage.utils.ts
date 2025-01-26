import { createError } from '../exceptions/create-error.exception'
import { LocalStorageOptions } from '../types/storage.types'

const defaultLocalStorageOptions: Required<Pick<LocalStorageOptions, 'isBase64' | 'isJSON'>> = {
  isBase64: false,
  isJSON: false
}

/**
 * Removes data from localStorage by key identifier.
 */
export const deleteLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error: unknown) {
    console.error(`Unable to delete item from localStorage with key ${key}`, error)

    throw createError({
      originalError: error as Error,
      reason: 'DELETE_LOCAL_STORAGE_ERROR'
    })
  }
}

/**
 * Gets data from localStorage by key identifier.
 */
export const getLocalStorage = <T = string>(key: string, options: LocalStorageOptions = {}): T | null => {
  const { isBase64, isJSON } = {
    ...defaultLocalStorageOptions,
    ...options
  }

  try {
    const entry = localStorage.getItem(key)

    if (!entry) return null

    const decodedEntry = isBase64 ? window.atob(entry) : entry
    const parsedEntry: T = isJSON ? JSON.parse(decodedEntry) : (decodedEntry as T)

    return parsedEntry
  } catch (error: unknown) {
    console.error(`Unable to get data from localStorage with key ${key}`, error)

    throw createError({
      originalError: error as Error,
      reason: 'GET_LOCAL_STORAGE_ERROR'
    })
  }
}

/**
 * Stores data in localStorage with specified key.
 */
export const putLocalStorage = (key: string, value: string | object, options: LocalStorageOptions = {}): void => {
  const { isBase64, isJSON } = {
    ...defaultLocalStorageOptions,
    ...options
  }

  try {
    const stringValue = isJSON ? JSON.stringify(value) : String(value)
    const finalValue = isBase64 ? window.btoa(stringValue) : stringValue

    localStorage.setItem(key, finalValue)
  } catch (error: unknown) {
    console.error(`Unable to put data into localStorage with key ${key}`, error)

    throw createError({
      originalError: error as Error,
      reason: 'PUT_LOCAL_STORAGE_ERROR'
    })
  }
}
