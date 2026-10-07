const apiPort = '8000'
const frontendPort = '5173'

function getApiBase() {
  const explicitApiBase = import.meta.env.VITE_API_BASE_URL

  if (explicitApiBase) {
    return explicitApiBase.replace(/\/$/, '')
  }

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (codespaceName) {
    return `https://${codespaceName}-${apiPort}.app.github.dev`
  }

  if (typeof window !== 'undefined' && window.location.hostname.endsWith('.app.github.dev')) {
    return `${window.location.protocol}//${window.location.hostname.replace(
      `-${frontendPort}.`,
      `-${apiPort}.`,
    )}`
  }

  return `http://localhost:${apiPort}`
}

export const apiBase = getApiBase()

export function apiUrl(path) {
  return `${apiBase}${path}`
}

export function readCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  return []
}