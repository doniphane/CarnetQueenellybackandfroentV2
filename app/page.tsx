"use client"

import { useState, useEffect } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { NoteCard } from "@/components/note-card"
import { NoteFilters } from "@/components/note-filters"
import { NoteForm } from "@/components/note-form"
import { NoteViewModal } from "@/components/note-view-modal"
import { CalendarMonthView } from "@/components/calendar-month-view"
import { CalendarWeekView } from "@/components/calendar-week-view"
import { CalendarListView } from "@/components/calendar-list-view"
import { EventForm } from "@/components/event-form"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardRecentActivity } from "@/components/dashboard-recent-activity"
import { DashboardQuickActions } from "@/components/dashboard-quick-actions"
import { CreatePublicCalendar } from "@/components/create-public-calendar"
import { PublicCalendarsList } from "@/components/public-calendars-list"
import { PublicCalendarView } from "@/components/public-calendar-view"

import { Button } from "@/components/ui/button"
import { Plus, Calendar, List, Grid, AlertCircle } from "lucide-react"
import type { Note } from "@/types/note"
import type { Event, CalendarView } from "@/types/event"
import type { PublicCalendar } from "@/types/public-calendar"
import { filterNotes } from "@/lib/note-utils"
import { filterEvents } from "@/lib/calendar-utils"
import { useAppData } from "@/hooks/useAppData"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Footer } from "@/components/footer"

export default function HomePage() {
  // Tous les hooks doivent être déclarés au début, avant toute condition de retour
  const [activeSection, setActiveSection] = useState("dashboard")
  const [filters, setFilters] = useState({ category: "all" as const, tag: "all" as const, search: "" })
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined)
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined)
  const [calendarView, setCalendarView] = useState<CalendarView>("month")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPublicCalendar, setSelectedPublicCalendar] = useState<PublicCalendar | null>(null)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  // Utiliser le hook personnalisé pour gérer les données (doit être appelé avant les conditions de retour)
  const {
    notes,
    events,
    dashboardStats,
    loading,
    errors,
    createNote,
    updateNote,
    deleteNote,
    createEvent,
    updateEvent,
    deleteEvent,
  } = useAppData()

  // Rediriger vers la page d'auth si pas connecté
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, authLoading, router])

  // Afficher un loader pendant la vérification d'auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  // Ne pas afficher la page si pas connecté
  if (!isAuthenticated) {
    return null
  }

  const filteredNotes = filterNotes(notes, filters)
  const filteredEvents = filterEvents(events, filters)

  const handleAddNote = () => {
    setActiveSection("notes")
    setShowNoteForm(true)
  }

  const handleAddEvent = () => {
    setActiveSection("calendar")
    setShowEventForm(true)
  }

  const handleViewNote = (note: Note) => {
    setSelectedNote(note)
    setIsNoteModalOpen(true)
  }

  const handleCloseNoteModal = () => {
    setIsNoteModalOpen(false)
    setSelectedNote(null)
  }

  const handleSearch = () => {
    if (activeSection === "notes") {
      // Focus on search input in notes section
      const searchInput = document.querySelector('input[placeholder*="Rechercher"]') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    } else {
      setActiveSection("notes")
      setTimeout(() => {
        const searchInput = document.querySelector('input[placeholder*="Rechercher"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }, 100)
    }
  }

  const handleFilter = () => {
    if (activeSection === "notes") {
      setShowFilters(!showFilters)
    } else {
      setActiveSection("notes")
      setShowFilters(true)
    }
  }

  const handleSaveNote = async (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, noteData)
      } else {
        await createNote(noteData)
      }
      setShowNoteForm(false)
      setEditingNote(undefined)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la note:', error)
      // Ici vous pourriez afficher une notification d'erreur
    }
  }

  const handleSaveEvent = async (eventData: Omit<Event, "id" | "createdAt" | "updatedAt">) => {
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventData)
      } else {
        await createEvent(eventData)
      }
      setShowEventForm(false)
      setEditingEvent(undefined)
      setSelectedDate(undefined)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'événement:', error)
      // Ici vous pourriez afficher une notification d'erreur
    }
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setShowNoteForm(true)
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setShowEventForm(true)
  }

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId)
    } catch (error) {
      console.error('Erreur lors de la suppression de la note:', error)
      // Ici vous pourriez afficher une notification d'erreur
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId)
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error)
      // Ici vous pourriez afficher une notification d'erreur
    }
  }

  const handleCancelNoteForm = () => {
    setShowNoteForm(false)
    setEditingNote(undefined)
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

  const handleCreateNote = () => {
    setActiveSection("notes")
    setShowNoteForm(true)
  }

  const handleCreateEvent = () => {
    setActiveSection("calendar")
    setShowEventForm(true)
  }

  const handleViewNotes = () => {
    setActiveSection("notes")
  }

  const handleViewCalendar = () => {
    setActiveSection("calendar")
  }

  const handleOpenPublicCalendar = (calendar: PublicCalendar) => {
    setSelectedPublicCalendar(calendar)
  }

  const handleBackToPublicCalendars = () => {
    setSelectedPublicCalendar(null)
  }

  // Afficher les erreurs si elles existent
  const hasErrors = errors.notes || errors.events || errors.dashboard

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarNavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onAddNote={handleAddNote}
          onAddEvent={handleAddEvent}
          onSearch={handleSearch}
          onFilter={handleFilter}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 ml-0 md:ml-0 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {/* Affichage des erreurs */}
            {hasErrors && (
              <div className="mb-6">
                {errors.notes && (
                  <Alert variant="destructive" className="mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Erreur lors du chargement des notes: {errors.notes}</AlertDescription>
                  </Alert>
                )}
                {errors.events && (
                  <Alert variant="destructive" className="mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Erreur lors du chargement des événements: {errors.events}</AlertDescription>
                  </Alert>
                )}
                {errors.dashboard && (
                  <Alert variant="destructive" className="mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Erreur lors du chargement du tableau de bord: {errors.dashboard}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {activeSection === "dashboard" && (
              <div className="space-y-6 md:space-y-8 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <div className="animate-in fade-in-0 slide-in-from-top-2 duration-300">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">Tableau de bord</h1>
                  <p className="text-muted-foreground mt-2">
                    Bienvenue dans votre espace de gestion de notes et d'emploi du temps
                  </p>
                </div>

                {loading.dashboard ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Chargement des statistiques...</p>
                  </div>
                ) : (
                  <DashboardStats notes={notes} events={events} />
                )}

                <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                  <DashboardQuickActions
                    onCreateNote={handleCreateNote}
                    onCreateEvent={handleCreateEvent}
                    onViewNotes={handleViewNotes}
                    onViewCalendar={handleViewCalendar}
                  />
                </div>

                <div className="animate-in fade-in-0 slide-in-from-bottom-6 duration-900">
                  <DashboardRecentActivity
                    notes={notes}
                    events={events}
                    onViewAllNotes={handleViewNotes}
                    onViewAllEvents={handleViewCalendar}
                  />
                </div>

                <div className="animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
                  <div className="flex justify-center">
                    <CreatePublicCalendar />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notes" && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                {!showNoteForm ? (
                  <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Mes Notes Publiques</h1>
                        <p className="text-muted-foreground mt-2">Gérez vos notes visibles par tous</p>
                      </div>
                      <Button
                        onClick={() => setShowNoteForm(true)}
                        className="gap-2 transition-all duration-200 hover:scale-105 hover:shadow-md w-full sm:w-auto"
                      >
                        <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                        Nouvelle note
                      </Button>
                    </div>

                    <div className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
                      <NoteFilters 
                        filters={filters} 
                        onFiltersChange={(newFilters) => setFilters(newFilters as typeof filters)} 
                        noteCount={filteredNotes.length} 
                      />
                    </div>

                    {loading.notes ? (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Chargement des notes...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {filteredNotes.map((note, index) => (
                          <div
                            key={note.id}
                            className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <NoteCard 
                              note={note} 
                              onEdit={handleEditNote} 
                              onDelete={handleDeleteNote} 
                              onView={handleViewNote}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {!loading.notes && filteredNotes.length === 0 && (
                      <div className="text-center py-12 animate-in fade-in-0 duration-500">
                        <p className="text-muted-foreground">Aucune note trouvée</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                    <NoteForm note={editingNote} onSave={handleSaveNote} onCancel={handleCancelNoteForm} />
                  </div>
                )}
              </div>
            )}

            {activeSection === "calendar" && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                {!showEventForm ? (
                  <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Mon Calendrier</h1>
                        <p className="text-muted-foreground mt-2">Organisez votre emploi du temps personnel</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
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
                        <Button
                          onClick={() => setShowEventForm(true)}
                          className="gap-2 transition-all duration-200 hover:scale-105 hover:shadow-md"
                        >
                          <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                          Nouvel événement
                        </Button>
                      </div>
                    </div>

                    {loading.events ? (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Chargement des événements...</p>
                      </div>
                    ) : (
                      <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                        {calendarView === "month" && (
                          <CalendarMonthView
                            currentDate={currentDate}
                            events={filteredEvents}
                            onDateChange={setCurrentDate}
                            onDayClick={handleDayClick}
                            onEventClick={handleEditEvent}
                          />
                        )}

                        {calendarView === "week" && (
                          <CalendarWeekView
                            currentDate={currentDate}
                            events={filteredEvents}
                            onDateChange={setCurrentDate}
                            onDayClick={handleDayClick}
                            onEventClick={handleEditEvent}
                          />
                        )}

                        {calendarView === "list" && (
                          <CalendarListView events={filteredEvents} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                    <EventForm
                      event={editingEvent}
                      selectedDate={selectedDate}
                      onSave={handleSaveEvent}
                      onCancel={handleCancelEventForm}
                    />
                  </div>
                )}
              </div>
            )}

            {activeSection === "public-calendars" && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                {selectedPublicCalendar ? (
                  <PublicCalendarView 
                    calendar={selectedPublicCalendar} 
                    onBack={handleBackToPublicCalendars}
                  />
                ) : (
                  <>
                    <div className="animate-in fade-in-0 slide-in-from-top-2 duration-300">
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground">Calendriers Publics</h1>
                      <p className="text-muted-foreground mt-2">Découvrez et gérez les calendriers partagés par la communauté</p>
                    </div>

                    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                      <PublicCalendarsList onOpenCalendar={handleOpenPublicCalendar} />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Footer - maintenant en bas de page */}
      <Footer />
      
      {/* Modal pour afficher le contenu complet d'une note */}
      <NoteViewModal
        note={selectedNote}
        isOpen={isNoteModalOpen}
        onClose={handleCloseNoteModal}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
      />
    </div>
  )
}
