import type { Note } from '@/types/note';
import type { Event } from '@/types/event';

// Configuration de l'API
const API_BASE_URL = 'https://localhost:8000/api';

// Fonction pour récupérer le token depuis les cookies
const getAuthToken = (): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; auth_token=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

// Types pour les réponses API
interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Service API principal
export class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const token = getAuthToken();
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      // Ajouter le token d'authentification si disponible
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        headers,
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }

      // Pour les requêtes DELETE, il n'y a généralement pas de contenu JSON
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return { data: null as T };
      }

      const data = await response.json();
      
      // API Platform peut retourner les données dans différents formats
      // Si c'est un objet avec hydra:member, on prend hydra:member
      // Sinon on prend directement les données
      const finalData = data['hydra:member'] !== undefined ? data['hydra:member'] : data;
      
      return { data: finalData };
    } catch (error) {
      console.error('Erreur API:', error);
      return {
        data: null as T,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      };
    }
  }

  // Méthodes pour les Notes
  static async getNotes(): Promise<ApiResponse<Note[]>> {
    return this.request<Note[]>('/notes');
  }

  static async getNote(id: string): Promise<ApiResponse<Note>> {
    return this.request<Note>(`/notes/${id}`);
  }

  static async createNote(noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Note>> {
    return this.request<Note>('/notes', {
      method: 'POST',
      body: JSON.stringify(noteData),
    });
  }

  static async updateNote(id: string, noteData: Partial<Note>): Promise<ApiResponse<Note>> {
    return this.request<Note>(`/notes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(noteData),
    });
  }

  static async deleteNote(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/notes/${id}`, {
      method: 'DELETE',
    });
  }

  // Méthodes pour les Événements
  static async getEvents(): Promise<ApiResponse<Event[]>> {
    return this.request<Event[]>('/events');
  }

  static async getEvent(id: string): Promise<ApiResponse<Event>> {
    return this.request<Event>(`/events/${id}`);
  }

  static async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Event>> {
    return this.request<Event>('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  static async updateEvent(id: string, eventData: Partial<Event>): Promise<ApiResponse<Event>> {
    return this.request<Event>(`/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(eventData),
    });
  }

  static async deleteEvent(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Méthodes pour le Tableau de bord
  static async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.request<DashboardStats>('/dashboard/stats');
  }
}

// Types pour les statistiques du tableau de bord
export interface DashboardStats {
  notes: {
    total: number;
    enCours: number;
    terminees: number;
    aFaire: number;
  };
  events: {
    total: number;
    enCours: number;
    termines: number;
    aFaire: number;
  };
  recentActivity: {
    notes: Array<{
      id: number;
      title: string;
      category: string;
      tag: string;
      createdAt: string;
    }>;
    events: Array<{
      id: number;
      title: string;
      category: string;
      tag: string;
      date: string;
      createdAt: string;
    }>;
  };
}

// Hooks personnalisés pour React
export const useApi = () => {
  return {
    // Notes
    getNotes: ApiService.getNotes,
    getNote: ApiService.getNote,
    createNote: ApiService.createNote,
    updateNote: ApiService.updateNote,
    deleteNote: ApiService.deleteNote,

    // Événements
    getEvents: ApiService.getEvents,
    getEvent: ApiService.getEvent,
    createEvent: ApiService.createEvent,
    updateEvent: ApiService.updateEvent,
    deleteEvent: ApiService.deleteEvent,

    // Tableau de bord
    getDashboardStats: ApiService.getDashboardStats,
  };
}; 