import { format } from 'date-fns'

/**
 * Formats a date to a specified format.
 */
export const formatDate = (date: Date | string, dateFormat: string): string => {
  if (!date) return ''

  const parsedDate = typeof date === 'string' ? new Date(date) : date

  if (isNaN(parsedDate.getTime())) return ''

  return format(parsedDate, dateFormat)
}

/**
 * Formats a date string to the format 'dd/MM/yyyy'.
 */
export const formatDateToShortDate = (date: Date | string): string => {
  return formatDate(date, 'dd/MM/yyyy')
}

/**
 * Formats a date string to the format 'dd/MM/yyyy HH:mm'.
 */
export const formatDateToShortDateTime = (date: Date | string): string => {
  return formatDate(date, 'dd/MM/yyyy HH:mm')
}
