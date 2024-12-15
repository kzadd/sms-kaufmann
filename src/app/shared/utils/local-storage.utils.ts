import { createError } from '../exceptions/create-error.exception'
import { LocalStorageOptions } from '../types/storage.types'

/**
 * Deletes an item from localStorage by its key.
 */
export const deleteLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Unable to delete item from localStorage with key ${key}`, error)
    throw createError({ originalError: error, reason: 'DELETE_LOCAL_STORAGE_ERROR' })
  }
}

/**
 * Retrieves an item from localStorage by its key.
 */
export const getLocalStorage = <T = string>(key: string, options: LocalStorageOptions = {}): T | null => {
  const { isBase64 = false, isJSON = false } = options

  try {
    const entry = localStorage.getItem(key)

    if (!entry) {
      return null
    }

    const decodedEntry = isBase64 ? window.atob(entry) : entry
    const parsedEntry: T = isJSON ? JSON.parse(decodedEntry) : (decodedEntry as T)

    return parsedEntry
  } catch (error) {
    console.error(`Unable to get data from localStorage with key ${key}`, error)
    throw createError({ originalError: error, reason: 'GET_LOCAL_STORAGE_ERROR' })
  }
}

/**
 * Sets a value in localStorage.
 */
export const putLocalStorage = (key: string, value: string | object, options: LocalStorageOptions = {}): void => {
  const { isBase64 = false, isJSON = false } = options

  try {
    const stringValue = isJSON ? JSON.stringify(value) : String(value)
    const finalValue = isBase64 ? window.btoa(stringValue) : stringValue

    localStorage.setItem(key, finalValue)
  } catch (error) {
    console.error(`Unable to put data into localStorage with key ${key}`, error)
    throw createError({ originalError: error, reason: 'PUT_LOCAL_STORAGE_ERROR' })
  }
}
