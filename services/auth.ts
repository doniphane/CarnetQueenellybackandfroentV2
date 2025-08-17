import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/auth';

// URL originale qui fonctionnait
const API_BASE_URL = 'https://localhost:8000/api';

export class AuthService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Inclut les cookies si nécessaire
        ...options,
      });

      if (!response.ok) {
        let errorMessage = `Erreur HTTP: ${response.status} - ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          // Si on ne peut pas parser le JSON, on utilise le message par défaut
          console.warn('Impossible de parser la réponse d\'erreur:', parseError);
        }
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur Auth API:', error);
      throw error;
    }
  }

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  static async getCurrentUser(token: string): Promise<User> {
    const response = await this.request<{ user: User }>('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.user;
  }

  static async logout(token: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/users/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
} 