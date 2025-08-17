// Service API pour les calendriers publics avec le backend Symfony
import { PublicCalendar, PublicCalendarEvent } from "@/types/public-calendar"

// URL originale qui fonctionnait
const API_BASE_URL = 'https://localhost:8000/api'

// Fonction pour récupérer le token depuis les cookies (même logique que useAuth)
const getAuthToken = (): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; auth_token=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

export class PublicCalendarApiService {
  // Récupérer tous les calendriers publics
  static async getAllPublicCalendars(): Promise<PublicCalendar[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public_calendars`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      return data.map((calendar: any) => ({
        id: calendar.id.toString(),
        name: calendar.name,
        description: calendar.description,
        color: calendar.color,
        ownerId: calendar.ownerId.toString(),
        ownerName: calendar.ownerName,
        ownerEmail: calendar.ownerEmail,
        isActive: calendar.isActive,
        createdAt: new Date(calendar.createdAt),
        updatedAt: new Date(calendar.updatedAt),
      }))
    } catch (error) {
      console.error('Erreur lors de la récupération des calendriers publics:', error)
      throw error
    }
  }

  // Créer un nouveau calendrier public
  static async createPublicCalendar(
    name: string,
    description: string,
    color: string,
    ownerId: string,
    ownerName: string,
    ownerEmail: string
  ): Promise<PublicCalendar> {
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/public_calendars`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name,
          description,
          color,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText} - ${errorText}`)
      }

      const calendar = await response.json()
      return {
        id: calendar.id.toString(),
        name: calendar.name,
        description: calendar.description,
        color: calendar.color,
        ownerId: calendar.ownerId.toString(),
        ownerName: calendar.ownerName,
        ownerEmail: calendar.ownerEmail,
        isActive: calendar.isActive,
        createdAt: new Date(calendar.createdAt),
        updatedAt: new Date(calendar.updatedAt),
      }
    } catch (error) {
      console.error('Erreur lors de la création du calendrier public:', error)
      throw error
    }
  }

  // Supprimer un calendrier public
  static async deletePublicCalendar(calendarId: string): Promise<boolean> {
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/public_calendars/${calendarId}`, {
        method: 'DELETE',
        headers,
      })

      return response.ok
    } catch (error) {
      console.error('Erreur lors de la suppression du calendrier public:', error)
      return false
    }
  }

  // Récupérer tous les événements d'un calendrier
  static async getCalendarEvents(calendarId: string): Promise<PublicCalendarEvent[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public_calendar_events?calendarId=${calendarId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      return data.map((event: any) => ({
        id: event.id.toString(),
        calendarId: event.calendarId.toString(),
        title: event.title,
        description: event.description,
        date: new Date(event.date),
        startTime: event.startTime,
        endTime: event.endTime,
        category: event.category,
        tag: event.tag,
        createdAt: new Date(event.createdAt),
        updatedAt: new Date(event.updatedAt),
      }))
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error)
      return []
    }
  }

  // Ajouter un événement à un calendrier
  static async addEventToCalendar(event: Omit<PublicCalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<PublicCalendarEvent> {
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/public_calendar_events`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          calendarId: parseInt(event.calendarId),
          title: event.title,
          description: event.description,
          date: event.date.toISOString().split('T')[0], // Format YYYY-MM-DD
          startTime: event.startTime,
          endTime: event.endTime,
          category: event.category,
          tag: event.tag,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText} - ${errorText}`)
      }

      const newEvent = await response.json()
      return {
        id: newEvent.id.toString(),
        calendarId: newEvent.calendarId.toString(),
        title: newEvent.title,
        description: newEvent.description,
        date: new Date(newEvent.date),
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
        category: newEvent.category,
        tag: newEvent.tag,
        createdAt: new Date(newEvent.createdAt),
        updatedAt: new Date(newEvent.updatedAt),
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement:', error)
      throw error
    }
  }

  // Mettre à jour un événement
  static async updateEvent(eventId: string, eventData: Partial<PublicCalendarEvent>): Promise<PublicCalendarEvent> {
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/public_calendar_events/${eventId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText} - ${errorText}`)
      }

      const updatedEvent = await response.json()
      return {
        id: updatedEvent.id.toString(),
        calendarId: updatedEvent.calendarId.toString(),
        title: updatedEvent.title,
        description: updatedEvent.description,
        date: new Date(updatedEvent.date),
        startTime: updatedEvent.startTime,
        endTime: updatedEvent.endTime,
        category: updatedEvent.category,
        tag: updatedEvent.tag,
        createdAt: new Date(updatedEvent.createdAt),
        updatedAt: new Date(updatedEvent.updatedAt),
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement:', error)
      throw error
    }
  }

  // Supprimer un événement
  static async deleteEvent(eventId: string): Promise<boolean> {
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/public_calendar_events/${eventId}`, {
        method: 'DELETE',
        headers,
      })

      return response.ok
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error)
      return false
    }
  }
} 