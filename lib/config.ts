// Configuration centralisée de l'API
// Ce fichier permet de gérer facilement l'URL de l'API backend

// URL de base de l'API backend
// En développement : https://localhost:8000/api
// En production : https://votre-domaine.com/api
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:8000/api'

// Configuration des headers par défaut
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

// Configuration des options de fetch par défaut
export const DEFAULT_FETCH_OPTIONS: RequestInit = {
  headers: DEFAULT_HEADERS,
  credentials: 'include' as RequestCredentials, // Pour inclure les cookies d'authentification
}

// Fonction utilitaire pour construire l'URL complète
export function buildApiUrl(endpoint: string): string {
  // Supprime le slash de début si présent
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  return `${API_BASE_URL}/${cleanEndpoint}`
}

// Fonction utilitaire pour les requêtes API
export async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = buildApiUrl(endpoint)
  const config = {
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
  }

  const response = await fetch(url, config)
  
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
  }

  return response.json()
} 