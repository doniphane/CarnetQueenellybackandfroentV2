import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/auth';

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
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
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

  static async logout(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/users/logout', {
      method: 'POST',
    });
  }
} 