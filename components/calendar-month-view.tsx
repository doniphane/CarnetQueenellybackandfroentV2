"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Event } from "@/types/event"
import { getMonthDays, isSameDay, getEventsForDay } from "@/lib/calendar-utils"
import { eventCategoryColors, eventTagColors } from "@/lib/calendar-utils"

interface CalendarMonthViewProps {
  currentDate: Date
  events: Event[]
  onDateChange: (date: Date) => void
  onDayClick: (date: Date) => void
  onEventClick: (event: Event) => void
}

export function CalendarMonthView({
  currentDate,
  events,
  onDateChange,
  onDayClick,
  onEventClick,
}: CalendarMonthViewProps) {
  const monthDays = getMonthDays(currentDate.getFullYear(), currentDate.getMonth())
  const today = new Date()

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    onDateChange(newDate)
  }

  const goToNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    onDateChange(newDate)
  }

  return (
    <div className="bg-card rounded-lg border border-border p-3 md:p-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-card-foreground transition-colors duration-200">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousMonth}
            className="transition-all duration-200 hover:scale-110 hover:shadow-md bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextMonth}
            className="transition-all duration-200 hover:scale-110 hover:shadow-md bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center text-xs md:text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {monthDays.map((day, index) => {
          const dayEvents = getEventsForDay(events, day)
          const isCurrentMonth = day.getMonth() === currentDate.getMonth()
          const isToday = isSameDay(day, today)

          return (
            <div
              key={index}
              className={`min-h-16 md:min-h-24 p-1 border border-border cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:scale-105 hover:shadow-md animate-in fade-in-0 duration-300 ${
                !isCurrentMonth ? "bg-muted/20 text-muted-foreground" : "bg-background"
              } ${isToday ? "ring-2 ring-accent shadow-lg" : ""}`}
              style={{ animationDelay: `${index * 10}ms` }}
              onClick={() => onDayClick(day)}
            >
              <div
                className={`text-xs md:text-sm font-medium mb-1 transition-colors duration-200 ${isToday ? "text-accent font-bold" : ""}`}
              >
                {day.getDate()}
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105 animate-in slide-in-from-left-2 duration-300 ${
                      eventCategoryColors[event.category]
                    } ${eventTagColors[event.tag]}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick(event)
                    }}
                  >
                    <div className="truncate font-medium">{event.title}</div>
                    <div className="truncate opacity-90 hidden md:block">{event.startTime}</div>
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-muted-foreground px-1 animate-in fade-in-0 duration-500">
                    +{dayEvents.length - 2} autres
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
