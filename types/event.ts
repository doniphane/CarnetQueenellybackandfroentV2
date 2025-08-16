export interface Event {
  id: string
  title: string
  description: string
  date: Date
  startTime: string
  endTime: string
  category: "personnel" | "travail" | "autre"
  tag: "en-cours" | "termine" | "a-faire"
  createdAt: Date
  updatedAt: Date
}

export interface EventFilters {
  category?: "personnel" | "travail" | "autre" | "all"
  tag?: "en-cours" | "termine" | "a-faire" | "all"
  search?: string
}

export type CalendarView = "month" | "week" | "list"
