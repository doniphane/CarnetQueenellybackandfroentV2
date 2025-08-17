"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Clock, Trash2, Edit, Eye } from "lucide-react"
import { usePublicCalendars } from "@/hooks/usePublicCalendars"
import { useAuth } from "@/hooks/useAuth"
import type { PublicCalendar } from "@/types/public-calendar"

interface PublicCalendarsListProps {
  onOpenCalendar?: (calendar: PublicCalendar) => void
}

export function PublicCalendarsList({ onOpenCalendar }: PublicCalendarsListProps) {
  const { publicCalendars, isLoading, error, deletePublicCalendar } = usePublicCalendars()
  const { user } = useAuth()

  const handleDeleteCalendar = async (calendarId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce calendrier public ?")) {
      try {
        await deletePublicCalendar(calendarId)
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
        alert("Erreur lors de la suppression du calendrier")
      }
    }
  }

  const handleOpenCalendar = (calendar: PublicCalendar) => {
    if (onOpenCalendar) {
      onOpenCalendar(calendar)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Chargement des calendriers publics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Erreur: {error}</p>
      </div>
    )
  }

  if (publicCalendars.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">Aucun calendrier public</h3>
        <p className="text-muted-foreground">Créez votre premier calendrier public pour commencer à partager vos événements.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Calendriers publics</h2>
        <Badge variant="secondary" className="text-sm">
          {publicCalendars.length} calendrier{publicCalendars.length > 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publicCalendars.map((calendar) => (
          <Card 
            key={calendar.id} 
            className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden"
            onClick={() => handleOpenCalendar(calendar)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2 sm:gap-3 w-full">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: calendar.color }}
                    />
                    <CardTitle className="text-base sm:text-lg leading-tight truncate overflow-hidden text-ellipsis whitespace-nowrap">
                      {calendar.name}
                    </CardTitle>
                  </div>
                  {calendar.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {calendar.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenCalendar(calendar)
                    }}
                    title="Voir le calendrier"
                    className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  {user && calendar.ownerId === user.id.toString() && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          // TODO: Implémenter l'édition
                        }}
                        title="Modifier le calendrier"
                        className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                      >
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteCalendar(calendar.id)
                        }}
                        className="text-destructive hover:text-destructive h-8 w-8 p-0 sm:h-9 sm:w-9"
                        title="Supprimer le calendrier"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Créé par {calendar.ownerName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Créé le {new Date(calendar.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={calendar.isActive ? "default" : "secondary"}>
                    {calendar.isActive ? "Actif" : "Inactif"}
                  </Badge>
                  {user && calendar.ownerId === user.id.toString() && (
                    <Badge variant="outline">Votre calendrier</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 