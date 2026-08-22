const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://guradian.vercel.app/'

export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, '')

export function apiUrl(path = '') {
  return `${API_BASE_URL}/${path.replace(/^\/+/, '')}`
}

export async function apiFetch(path, options) {
  const response = await fetch(apiUrl(path), options)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`)
  }

  return response
}
