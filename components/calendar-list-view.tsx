"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Clock, Calendar } from "lucide-react"
import type { Event } from "@/types/event"
import { categoryColors, tagColors, categoryLabels, tagLabels } from "@/lib/note-utils"
import { formatEventDate, formatEventTime } from "@/lib/calendar-utils"

interface CalendarListViewProps {
  events: Event[]
  onEdit?: (event: Event) => void
  onDelete?: (eventId: string) => void
}

export function CalendarListView({ events, onEdit, onDelete }: CalendarListViewProps) {
  const sortedEvents = [...events].sort((a, b) => {
    const dateCompare = a.date.getTime() - b.date.getTime()
    if (dateCompare !== 0) return dateCompare
    return a.startTime.localeCompare(b.startTime)
  })

  return (
    <div className="space-y-4">
      {sortedEvents.map((event) => (
        <Card key={event.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-card-foreground text-lg leading-tight">{event.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatEventDate(event.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatEventTime(event.startTime, event.endTime)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {onEdit && (
                  <Button variant="ghost" size="sm" onClick={() => onEdit(event)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button variant="ghost" size="sm" onClick={() => onDelete(event.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground text-sm mb-4">{event.description}</p>

            <div className="flex items-center gap-2">
              <Badge className={`text-xs px-2 py-1 ${categoryColors[event.category]}`}>
                {categoryLabels[event.category]}
              </Badge>
              <Badge variant="outline" className={`text-xs px-2 py-1 ${tagColors[event.tag]}`}>
                {tagLabels[event.tag]}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}

      {sortedEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun événement trouvé</p>
        </div>
      )}
    </div>
  )
}
