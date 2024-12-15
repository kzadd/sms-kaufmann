import Cookie from 'js-cookie'

import { createError } from '../exceptions/create-error.exception'
import { CookieOptions } from '../types/storage.types'

/**
 * Deletes a cookie by its key.
 */
export const deleteCookie = (key: string): void => {
  try {
    Cookie.remove(key)
  } catch (error) {
    console.error(`Unable to delete cookie ${key}`, error)
    throw createError({ originalError: error, reason: 'DELETE_COOKIE_ERROR' })
  }
}

/**
 * Retrieves a cookie's value by its key.
 */
export const getCookie = <T = string>(key: string, options: CookieOptions = {}): T | null => {
  const { isBase64 = false, isJSON = false } = options

  try {
    const entry = Cookie.get(key)

    if (!entry) {
      return null
    }

    const decodedEntry = isBase64 ? window.atob(entry) : entry
    const parsedEntry: T = isJSON ? JSON.parse(decodedEntry) : (decodedEntry as T)

    return parsedEntry
  } catch (error) {
    console.error(`Unable to get data from cookie ${key}`, error)
    throw createError({ originalError: error, reason: 'GET_COOKIE_ERROR' })
  }
}

/**
 * Sets a value in a cookie.
 */
export const putCookie = (key: string, value: string | object, options: CookieOptions = {}): void => {
  const { domain, expires, isBase64 = false, isJSON = false, path = '/', secure = true } = options

  const config = {
    domain,
    expires,
    path,
    secure
  }

  try {
    const stringValue = isJSON ? JSON.stringify(value) : String(value)
    const finalValue = isBase64 ? window.btoa(stringValue) : stringValue

    Cookie.set(key, finalValue, config)
  } catch (error) {
    console.error(`Unable to put data into cookie ${key}`, error)
    throw createError({ originalError: error, reason: 'PUT_COOKIE_ERROR' })
  }
}
