"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StickyNote, Calendar, ArrowRight } from "lucide-react"
import type { Note } from "@/types/note"
import type { Event } from "@/types/event"
import { categoryColors, tagColors, categoryLabels, tagLabels, formatDate } from "@/lib/note-utils"
import { formatEventDate } from "@/lib/calendar-utils"

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
  const recentNotes = notes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 3)

  const now = new Date()
  const upcomingEvents = events
    .filter((event) => {
      const eventDateTime = new Date(event.date)
      // If event has time, combine date and time for accurate comparison
      if (event.startTime) {
        const [hours, minutes] = event.startTime.split(":").map(Number)
        eventDateTime.setHours(hours, minutes, 0, 0)
      }
      return eventDateTime > now
    })
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      if (a.startTime) {
        const [hoursA, minutesA] = a.startTime.split(":").map(Number)
        dateA.setHours(hoursA, minutesA, 0, 0)
      }
      if (b.startTime) {
        const [hoursB, minutesB] = b.startTime.split(":").map(Number)
        dateB.setHours(hoursB, minutesB, 0, 0)
      }
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, 3)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Notes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-chart-1" />
            Notes récentes
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewAllNotes} className="gap-1">
            Voir tout
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentNotes.length > 0 ? (
            recentNotes.map((note) => (
              <div key={note.id} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground truncate">{note.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{note.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{formatDate(note.date)}</p>
                </div>
                <div className="flex flex-col gap-1 ml-3">
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
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-chart-2" />
            Événements à venir
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewAllEvents} className="gap-1">
            Voir tout
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground truncate">{event.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{formatEventDate(event.date)}</span>
                    <span>•</span>
                    <span>
                      {event.startTime} - {event.endTime}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 ml-3">
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
