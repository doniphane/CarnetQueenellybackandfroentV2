"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"
import type { Note } from "@/types/note"
import { categoryColors, tagColors, categoryLabels, tagLabels, formatDate } from "@/lib/note-utils"

interface NoteCardProps {
  note: Note
  onEdit?: (note: Note) => void
  onDelete?: (noteId: string) => void
  onView?: (note: Note) => void
}

export function NoteCard({ note, onEdit, onDelete, onView }: NoteCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground text-lg leading-tight truncate transition-colors duration-200 group-hover:text-accent">
              {note.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 transition-colors duration-200">{formatDate(note.date)}</p>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            {onView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(note)}
                className="transition-all duration-200 hover:scale-110 hover:bg-accent/10"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(note)}
                className="transition-all duration-200 hover:scale-110 hover:bg-accent/10"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(note.id)}
                className="transition-all duration-200 hover:scale-110 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
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
          <div className="flex items-center gap-2">
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
