import Cookie from 'js-cookie'

import { createError } from '../exceptions/create-error.exception'
import { CookieOptions } from '../types/storage.types'

const defaultCookieOptions: Required<Pick<CookieOptions, 'isBase64' | 'isJSON' | 'path' | 'secure'>> = {
  isBase64: false,
  isJSON: false,
  path: '/',
  secure: true
}

/**
 * Removes a cookie from the browser storage by its unique identifier.
 */
export const deleteCookie = (key: string): void => {
  try {
    Cookie.remove(key)
  } catch (error: unknown) {
    console.error(`Unable to delete cookie ${key}`, error)

    throw createError({
      originalError: error as Error,
      reason: 'DELETE_COOKIE_ERROR'
    })
  }
}

/**
 * Gets a cookie value from browser storage using a key identifier.
 */
export const getCookie = <T = string>(key: string, options: CookieOptions = {}): T | null => {
  const { isBase64, isJSON } = {
    ...defaultCookieOptions,
    ...options
  }

  try {
    const entry = Cookie.get(key)

    if (!entry) return null

    const decodedEntry = isBase64 ? window.atob(entry) : entry
    const parsedEntry: T = isJSON ? JSON.parse(decodedEntry) : (decodedEntry as T)

    return parsedEntry
  } catch (error: unknown) {
    console.error(`Unable to get data from cookie ${key}`, error)

    throw createError({
      originalError: error as Error,
      reason: 'GET_COOKIE_ERROR'
    })
  }
}

/**
 * Stores data in browser cookies with specified key and configuration options.
 */
export const putCookie = (key: string, value: string | object, options: CookieOptions = {}): void => {
  const { domain, expires, isBase64, isJSON, path, secure } = {
    ...defaultCookieOptions,
    ...options
  }

  try {
    const stringValue = isJSON ? JSON.stringify(value) : String(value)
    const finalValue = isBase64 ? window.btoa(stringValue) : stringValue

    Cookie.set(key, finalValue, {
      domain,
      expires,
      path,
      secure
    })
  } catch (error: unknown) {
    console.error(`Unable to put data into cookie ${key}`, error)

    throw createError({
      originalError: error as Error,
      reason: 'PUT_COOKIE_ERROR'
    })
  }
}
