import type { Note } from "@/types/note"

export const categoryColors = {
  personnel: "bg-chart-1 text-white",
  travail: "bg-chart-2 text-white",
  autre: "bg-chart-3 text-white",
} as const

export const tagColors = {
  "en-cours": "bg-yellow-100 text-yellow-800 border-yellow-200",
  termine: "bg-green-100 text-green-800 border-green-200",
  "a-faire": "bg-blue-100 text-blue-800 border-blue-200",
} as const

export const categoryLabels = {
  personnel: "Personnel",
  travail: "Travail",
  autre: "Autre",
} as const

export const tagLabels = {
  "en-cours": "En cours",
  termine: "Terminé",
  "a-faire": "À faire",
} as const

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function filterNotes(notes: Note[], filters: { category?: string; tag?: string; search?: string }): Note[] {
  return notes.filter((note) => {
    // Category filter
    if (filters.category && filters.category !== "all" && note.category !== filters.category) {
      return false
    }

    // Tag filter
    if (filters.tag && filters.tag !== "all" && note.tag !== filters.tag) {
      return false
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return note.title.toLowerCase().includes(searchLower) || note.description.toLowerCase().includes(searchLower)
    }

    return true
  })
}
