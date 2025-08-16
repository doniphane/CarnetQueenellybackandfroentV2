"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"
import { categoryLabels, tagLabels } from "@/lib/note-utils"

interface NoteFiltersProps {
  filters: {
    category?: string
    tag?: string
    search?: string
  }
  onFiltersChange: (filters: { category?: string; tag?: string; search?: string }) => void
  noteCount: number
}

export function NoteFilters({ filters, onFiltersChange, noteCount }: NoteFiltersProps) {
  const categories = Object.entries(categoryLabels)
  const tags = Object.entries(tagLabels)

  const hasActiveFilters = filters.category !== "all" || filters.tag !== "all" || filters.search

  const clearFilters = () => {
    onFiltersChange({ category: "all", tag: "all", search: "" })
  }

  return (
    <div className="space-y-4 animate-in fade-in-0 slide-in-from-top-4 duration-500">
      {/* Search */}
      <div className="relative animate-in fade-in-0 slide-in-from-left-2 duration-300">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-200" />
        <Input
          placeholder="Rechercher dans les notes..."
          value={filters.search || ""}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 transition-all duration-200 focus:scale-105 focus:shadow-md"
        />
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap items-center gap-3 animate-in fade-in-0 slide-in-from-left-4 duration-500">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filtres:</span>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Catégorie:</span>
          <Button
            variant={filters.category === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => onFiltersChange({ ...filters, category: "all" })}
            className="transition-all duration-200 hover:scale-105 hover:shadow-sm"
          >
            Toutes
          </Button>
          {categories.map(([key, label]) => (
            <Button
              key={key}
              variant={filters.category === key ? "default" : "outline"}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, category: key })}
              className="transition-all duration-200 hover:scale-105 hover:shadow-sm"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Statut:</span>
          <Button
            variant={filters.tag === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => onFiltersChange({ ...filters, tag: "all" })}
            className="transition-all duration-200 hover:scale-105 hover:shadow-sm"
          >
            Tous
          </Button>
          {tags.map(([key, label]) => (
            <Button
              key={key}
              variant={filters.tag === key ? "default" : "outline"}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, tag: key })}
              className="transition-all duration-200 hover:scale-105 hover:shadow-sm"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground transition-all duration-200 hover:scale-105 hover:shadow-sm animate-in fade-in-0 duration-300"
          >
            <X className="h-4 w-4 mr-1" />
            Effacer
          </Button>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
        <p className="text-sm text-muted-foreground transition-colors duration-200">
          {noteCount} note{noteCount !== 1 ? "s" : ""} trouvée{noteCount !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  )
}
