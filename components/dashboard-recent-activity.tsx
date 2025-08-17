"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StickyNote, Calendar, ArrowRight } from "lucide-react"
import type { Note } from "@/types/note"
import type { Event } from "@/types/event"
import { categoryColors, tagColors, categoryLabels, tagLabels, formatDate } from "@/lib/note-utils"
import { formatEventDate, formatEventTime } from "@/lib/calendar-utils"

interface DashboardRecentActivityProps {
  notes: Note[]
  events: Event[]
  onViewAllNotes: () => void
  onViewAllEvents: () => void
}

export function DashboardRecentActivity({
  notes,
  events,
  onViewAllNotes,
  onViewAllEvents,
}: DashboardRecentActivityProps) {
  const recentNotes = [...notes]
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 3)

  const upcomingEvents = [...events]
    .filter((event) => {
      const eventDate = new Date(event.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return eventDate >= today
    })
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, 3)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Notes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <StickyNote className="h-5 w-5 text-chart-1 flex-shrink-0" />
            <span className="truncate">Notes récentes</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewAllNotes} className="gap-1 flex-shrink-0">
            <span className="hidden sm:inline">Voir tout</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentNotes.length > 0 ? (
            recentNotes.map((note) => (
              <div key={note.id} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg gap-2 overflow-hidden">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h4 className="font-medium text-sm text-foreground truncate overflow-hidden text-ellipsis whitespace-nowrap">{note.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{note.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{formatDate(note.date)}</p>
                </div>
                <div className="flex flex-col gap-1 ml-2 sm:ml-3 flex-shrink-0">
                  <Badge className={`text-xs px-2 py-1 ${categoryColors[note.category]}`}>
                    {categoryLabels[note.category]}
                  </Badge>
                  <Badge variant="outline" className={`text-xs px-2 py-1 ${tagColors[note.tag]}`}>
                    {tagLabels[note.tag]}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm text-center py-4">Aucune note récente</p>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Calendar className="h-5 w-5 text-chart-2 flex-shrink-0" />
            <span className="truncate">Événements à venir</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewAllEvents} className="gap-1 flex-shrink-0">
            <span className="hidden sm:inline">Voir tout</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg gap-2 overflow-hidden">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h4 className="font-medium text-sm text-foreground truncate overflow-hidden text-ellipsis whitespace-nowrap">{event.title}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="truncate">{formatEventDate(event.date)}</span>
                    <span className="truncate">{formatEventTime(event.startTime, event.endTime)}</span>
                  </div>
                  {event.description && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{event.description}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 ml-2 sm:ml-3 flex-shrink-0">
                  <Badge className={`text-xs px-2 py-1 ${categoryColors[event.category]}`}>
                    {categoryLabels[event.category]}
                  </Badge>
                  <Badge variant="outline" className={`text-xs px-2 py-1 ${tagColors[event.tag]}`}>
                    {tagLabels[event.tag]}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm text-center py-4">Aucun événement à venir</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
