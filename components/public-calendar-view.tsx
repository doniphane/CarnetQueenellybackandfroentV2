"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarMonthView } from "@/components/calendar-month-view"
import { CalendarWeekView } from "@/components/calendar-week-view"
import { CalendarListView } from "@/components/calendar-list-view"
import { EventForm } from "@/components/event-form"
import { Plus, ArrowLeft, Grid, Calendar, List, Users, Clock } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { usePublicCalendars } from "@/hooks/usePublicCalendars"
import type { PublicCalendar, PublicCalendarEvent } from "@/types/public-calendar"
import type { CalendarView, Event } from "@/types/event"

interface PublicCalendarViewProps {
  calendar: PublicCalendar
  onBack: () => void
}

export function PublicCalendarView({ calendar, onBack }: PublicCalendarViewProps) {
  const { user } = useAuth()
  const { getCalendarEvents, addEventToCalendar, deleteEvent } = usePublicCalendars()
  
  const [calendarView, setCalendarView] = useState<CalendarView>("month")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<PublicCalendarEvent | undefined>(undefined)
  const [events, setEvents] = useState<PublicCalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Charger les événements du calendrier
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true)
        const calendarEvents = await getCalendarEvents(calendar.id)
        setEvents(calendarEvents)
      } catch (error) {
        console.error("Erreur lors du chargement des événements:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [calendar.id])

  const handleAddEvent = () => {
    setShowEventForm(true)
  }

  const handleSaveEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingEvent) {
        // TODO: Implémenter la modification d'événement
        console.log("Modification d'événement:", editingEvent.id, eventData)
      } else {
        const newEvent = await addEventToCalendar(
          calendar.id,
          eventData.title,
          eventData.description,
          eventData.date,
          eventData.startTime,
          eventData.endTime,
          eventData.category,
          eventData.tag
        )
        setEvents(prev => [...prev, newEvent])
      }
      setShowEventForm(false)
      setEditingEvent(undefined)
      setSelectedDate(undefined)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'événement:', error)
    }
  }

  const handleEditEvent = (event: Event) => {
    // Trouver l'événement correspondant dans les événements du calendrier public
    const publicEvent = events.find(e => e.id === event.id)
    if (publicEvent) {
      setEditingEvent(publicEvent)
      setShowEventForm(true)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const success = await deleteEvent(eventId)
      if (success) {
        setEvents(prev => prev.filter(event => event.id !== eventId))
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error)
    }
  }

  const handleCancelEventForm = () => {
    setShowEventForm(false)
    setEditingEvent(undefined)
    setSelectedDate(undefined)
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    setShowEventForm(true)
  }

  const isOwner = user && calendar.ownerId === user.id.toString()

  // Convertir les événements du calendrier public en format Event pour les composants
  const convertedEvents: Event[] = events.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    category: event.category,
    tag: event.tag,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  }))

  if (showEventForm) {
    return (
      <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
        <EventForm
          event={editingEvent ? {
            id: editingEvent.id,
            title: editingEvent.title,
            description: editingEvent.description,
            date: editingEvent.date,
            startTime: editingEvent.startTime,
            endTime: editingEvent.endTime,
            category: editingEvent.category,
            tag: editingEvent.tag,
            createdAt: editingEvent.createdAt,
            updatedAt: editingEvent.updatedAt,
          } : undefined}
          selectedDate={selectedDate}
          onSave={handleSaveEvent}
          onCancel={handleCancelEventForm}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in-0 slide-in-from-top-2 duration-300">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: calendar.color }}
              />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {calendar.name}
              </h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Calendrier public partagé par {calendar.ownerName}
            </p>
          </div>
        </div>
        
        {isOwner && (
          <Button
            onClick={handleAddEvent}
            className="gap-2 transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            Nouvel événement
          </Button>
        )}
      </div>

      {/* Calendar Info Card */}
      <Card className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Informations du calendrier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Propriétaire</p>
                <p className="text-sm text-muted-foreground">{calendar.ownerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Créé le</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(calendar.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={calendar.isActive ? "default" : "secondary"}>
                {calendar.isActive ? "Actif" : "Inactif"}
              </Badge>
              {isOwner && (
                <Badge variant="outline">Votre calendrier</Badge>
              )}
            </div>
          </div>
          {calendar.description && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">{calendar.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calendar View Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in-0 slide-in-from-top-6 duration-700">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button
            variant={calendarView === "month" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setCalendarView("month")}
            className="transition-all duration-200 hover:scale-105"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={calendarView === "week" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setCalendarView("week")}
            className="transition-all duration-200 hover:scale-105"
          >
            <Calendar className="h-4 w-4" />
          </Button>
          <Button
            variant={calendarView === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setCalendarView("list")}
            className="transition-all duration-200 hover:scale-105"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {events.length} événement{events.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Calendar Content */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement des événements...</p>
        </div>
      ) : (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          {calendarView === "month" && (
            <CalendarMonthView
              currentDate={currentDate}
              events={convertedEvents}
              onDateChange={setCurrentDate}
              onDayClick={handleDayClick}
              onEventClick={handleEditEvent}
            />
          )}

          {calendarView === "week" && (
            <CalendarWeekView
              currentDate={currentDate}
              events={convertedEvents}
              onDateChange={setCurrentDate}
              onDayClick={handleDayClick}
              onEventClick={handleEditEvent}
            />
          )}

          {calendarView === "list" && (
            <CalendarListView 
              events={convertedEvents}
              onEdit={handleEditEvent} 
              onDelete={isOwner ? handleDeleteEvent : undefined} 
            />
          )}
        </div>
      )}

      {!isLoading && events.length === 0 && (
        <div className="text-center py-12 animate-in fade-in-0 duration-500">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">Aucun événement</h3>
          <p className="text-muted-foreground">
            {isOwner 
              ? "Ce calendrier n'a pas encore d'événements. Créez le premier !"
              : "Ce calendrier n'a pas encore d'événements."
            }
          </p>
        </div>
      )}
    </div>
  )
} 