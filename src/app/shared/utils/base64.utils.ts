/**
 * Converts a file to a base64 formatted string with MIME type prefix
 */
export const fileToBase64 = (file: File, mimeType?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result as string
      const base64Data = base64String.split(',')[1] || base64String
      const mime = mimeType || file.type || 'application/octet-stream'
      const base64WithPrefix = `data:${mime};base64,${base64Data}`

      resolve(base64WithPrefix)
    }

    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }

    reader.readAsDataURL(file)
  })
}
