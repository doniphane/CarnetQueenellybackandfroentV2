// Hook pour les calendriers publics
import { useState, useEffect, useCallback } from "react"
import { PublicCalendarApiService } from "@/services/public-calendar-api"
import { PublicCalendar, PublicCalendarEvent } from "@/types/public-calendar"

export function usePublicCalendars() {
  // État pour les calendriers publics
  const [publicCalendars, setPublicCalendars] = useState<PublicCalendar[]>([])
  
  // État de chargement
  const [isLoading, setIsLoading] = useState(true)
  
  // État pour les erreurs
  const [error, setError] = useState<string | null>(null)

  // Fonction pour charger les calendriers publics
  const loadPublicCalendars = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const calendars = await PublicCalendarApiService.getAllPublicCalendars()
      setPublicCalendars(calendars)
      
    } catch (err) {
      setError("Impossible de charger les calendriers publics")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fonction pour créer un calendrier public
  const createPublicCalendar = useCallback(async (
    name: string,
    description: string,
    color: string,
    ownerId: string,
    ownerName: string,
    ownerEmail: string
  ): Promise<PublicCalendar> => {
    const newCalendar = await PublicCalendarApiService.createPublicCalendar(
      name,
      description,
      color,
      ownerId,
      ownerName,
      ownerEmail
    )
    await loadPublicCalendars() // Recharger les calendriers
    return newCalendar
  }, [loadPublicCalendars])

  // Fonction pour supprimer un calendrier public
  const deletePublicCalendar = useCallback(async (calendarId: string): Promise<boolean> => {
    const success = await PublicCalendarApiService.deletePublicCalendar(calendarId)
    if (success) {
      await loadPublicCalendars() // Recharger les calendriers
    }
    return success
  }, [loadPublicCalendars])

  // Fonction pour vérifier si l'utilisateur est propriétaire
  const isCalendarOwner = useCallback((calendarId: string, userId: string): boolean => {
    const calendar = publicCalendars.find(cal => cal.id === calendarId)
    return calendar?.ownerId === userId
  }, [publicCalendars])

  // Fonction pour récupérer les événements d'un calendrier
  const getCalendarEvents = useCallback(async (calendarId: string): Promise<PublicCalendarEvent[]> => {
    return await PublicCalendarApiService.getCalendarEvents(calendarId)
  }, [])

  // Fonction pour ajouter un événement
  const addEventToCalendar = useCallback(async (
    calendarId: string,
    title: string,
    description: string,
    date: Date,
    startTime: string,
    endTime: string,
    category: "personnel" | "travail" | "autre",
    tag: "en-cours" | "termine" | "a-faire"
  ): Promise<PublicCalendarEvent> => {
    const newEvent = await PublicCalendarApiService.addEventToCalendar({
      calendarId,
      title,
      description,
      date,
      startTime,
      endTime,
      category,
      tag,
    })
    return newEvent
  }, [])

  // Fonction pour supprimer un événement
  const deleteEvent = useCallback(async (eventId: string): Promise<boolean> => {
    return await PublicCalendarApiService.deleteEvent(eventId)
  }, [])

  // Charger les calendriers au montage
  useEffect(() => {
    loadPublicCalendars()
  }, [loadPublicCalendars])

  return {
    // États
    publicCalendars,
    isLoading,
    error,
    
    // Actions
    loadPublicCalendars,
    createPublicCalendar,
    deletePublicCalendar,
    isCalendarOwner,
    getCalendarEvents,
    addEventToCalendar,
    deleteEvent,
  }
} 