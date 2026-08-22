const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://guradian.vercel.app/'

export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, '')

export function apiUrl(path = '') {
  return `${API_BASE_URL}/${path.replace(/^\/+/, '')}`
}

export async function apiFetch(path, options) {
  const response = await fetch(apiUrl(path), options)

  if (!response.ok) {
    let message

    try {
      const body = await response.clone().json()
      message = body.message || body.reason || body.error
    } catch {
      // Some API errors have an empty or non-JSON body.
    }

    throw new Error(message || `Request failed with status ${response.status}.`)
  }

  return response
}
