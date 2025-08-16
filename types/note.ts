export interface Note {
  id: string
  title: string
  description: string
  date: Date
  category: "personnel" | "travail" | "autre"
  tag: "en-cours" | "termine" | "a-faire"
  createdAt: Date
  updatedAt: Date
}

export interface NoteFilters {
  category?: "personnel" | "travail" | "autre" | "all"
  tag?: "en-cours" | "termine" | "a-faire" | "all"
  search?: string
}
