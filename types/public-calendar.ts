// Types pour les calendriers publics
export interface PublicCalendar {
  id: string
  name: string
  description?: string
  color: string
  ownerId: string
  ownerName: string
  ownerEmail: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Interface pour les événements des calendriers publics
export interface PublicCalendarEvent {
  id: string
  calendarId: string
  title: string
  description: string
  date: Date
  startTime: string
  endTime: string
  category: "personnel" | "travail" | "autre"
  tag: "en-cours" | "termine" | "a-faire"
  createdAt: Date
  updatedAt: Date
} 