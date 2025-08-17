"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { Note } from "@/types/note"
import { categoryColors, tagColors, categoryLabels, tagLabels, formatDate } from "@/lib/note-utils"

interface NoteCardProps {
  note: Note
  onEdit?: (note: Note) => void
  onDelete?: (noteId: string) => void
  onView?: (note: Note) => void
}

export function NoteCard({ note, onEdit, onDelete, onView }: NoteCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Empêcher l'ouverture du modal si on clique sur les boutons d'action
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    if (onView) {
      onView(note)
    }
  }

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:scale-105 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 sm:gap-3 w-full">
          <div className="flex-1 min-w-0 overflow-hidden">
            <h3 className="font-semibold text-card-foreground text-base sm:text-lg leading-tight transition-colors duration-200 group-hover:text-accent truncate overflow-hidden text-ellipsis whitespace-nowrap">
              {note.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 transition-colors duration-200">{formatDate(note.date)}</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 flex-shrink-0">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(note)
                }}
                className="transition-all duration-200 hover:scale-110 hover:bg-accent/10 h-8 w-8 p-0 sm:h-9 sm:w-9"
              >
                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(note.id)
                }}
                className="transition-all duration-200 hover:scale-110 hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0 sm:h-9 sm:w-9"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 transition-colors duration-200">
          {note.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <Badge
              className={`text-xs px-2 py-1 transition-all duration-200 hover:scale-105 ${categoryColors[note.category]}`}
            >
              {categoryLabels[note.category]}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs px-2 py-1 transition-all duration-200 hover:scale-105 ${tagColors[note.tag]}`}
            >
              {tagLabels[note.tag]}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
