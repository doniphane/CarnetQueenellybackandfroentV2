"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Event } from "@/types/event"
import { getWeekDays, isSameDay, getEventsForDay, formatEventTime } from "@/lib/calendar-utils"
import { eventCategoryColors, eventTagColors } from "@/lib/calendar-utils"

interface CalendarWeekViewProps {
  currentDate: Date
  events: Event[]
  onDateChange: (date: Date) => void
  onDayClick: (date: Date) => void
  onEventClick: (event: Event) => void
}

export function CalendarWeekView({
  currentDate,
  events,
  onDateChange,
  onDayClick,
  onEventClick,
}: CalendarWeekViewProps) {
  const weekDays = getWeekDays(currentDate)
  const today = new Date()

  const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    onDateChange(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    onDateChange(newDate)
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Semaine du {weekDays[0].getDate()}/{weekDays[0].getMonth() + 1} au {weekDays[6].getDate()}/
          {weekDays[6].getMonth() + 1}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDay(events, day)
          const isToday = isSameDay(day, today)

          return (
            <div key={index} className="space-y-2">
              {/* Day header */}
              <div
                className={`text-center p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                  isToday ? "bg-accent text-accent-foreground font-bold" : "bg-muted/20"
                }`}
                onClick={() => onDayClick(day)}
              >
                <div className="text-sm font-medium">{dayNames[index]}</div>
                <div className="text-lg font-bold">{day.getDate()}</div>
              </div>

              {/* Events */}
              <div className="space-y-2 min-h-96">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-2 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                      eventCategoryColors[event.category]
                    } ${eventTagColors[event.tag]}`}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="font-medium text-sm mb-1">{event.title}</div>
                    <div className="text-xs opacity-90">{formatEventTime(event.startTime, event.endTime)}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
