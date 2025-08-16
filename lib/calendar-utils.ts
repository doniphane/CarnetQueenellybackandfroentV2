import type { Event, EventFilters } from "@/types/event"

export const eventCategoryColors = {
  personnel: "bg-chart-1 border-chart-1 text-white",
  travail: "bg-chart-2 border-chart-2 text-white",
  autre: "bg-chart-3 border-chart-3 text-white",
} as const

export const eventTagColors = {
  "en-cours": "border-l-4 border-l-yellow-400",
  termine: "border-l-4 border-l-green-400",
  "a-faire": "border-l-4 border-l-blue-400",
} as const

export function formatTime(time: string): string {
  return time
}

export function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function formatEventTime(startTime: string, endTime: string): string {
  return `${startTime} - ${endTime}`
}

export function getMonthDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days: Date[] = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return days
}

export function getWeekDays(date: Date): Date[] {
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay())

  const days: Date[] = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    days.push(day)
  }

  return days
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function getEventsForDay(events: Event[], date: Date): Event[] {
  return events.filter((event) => isSameDay(event.date, date))
}

export function filterEvents(events: Event[], filters: EventFilters): Event[] {
  return events.filter((event) => {
    // Category filter
    if (filters.category && filters.category !== "all" && event.category !== filters.category) {
      return false
    }

    // Tag filter
    if (filters.tag && filters.tag !== "all" && event.tag !== filters.tag) {
      return false
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return event.title.toLowerCase().includes(searchLower) || event.description.toLowerCase().includes(searchLower)
    }

    return true
  })
}
