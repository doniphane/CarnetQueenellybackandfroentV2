"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { Note } from "@/types/note"
import { categoryColors, tagColors, categoryLabels, tagLabels, formatDate } from "@/lib/note-utils"

interface NoteViewModalProps {
  note: Note | null
  isOpen: boolean
  onClose: () => void
  onEdit?: (note: Note) => void
  onDelete?: (noteId: string) => void
}

export function NoteViewModal({ 
  note, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete 
}: NoteViewModalProps) {
  // Si aucune note n'est sélectionnée, ne rien afficher
  if (!note) {
    return null
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(note)
      onClose() // Fermer le modal après avoir lancé l'édition
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(note.id)
      onClose() // Fermer le modal après la suppression
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div className="flex-1 min-w-0">
            <DialogTitle className="text-xl font-semibold text-foreground leading-tight">
              {note.title}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Créée le {formatDate(note.date)}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="transition-all duration-200 hover:scale-110 hover:bg-accent/10"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="transition-all duration-200 hover:scale-110 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contenu de la note */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Description
              </h4>
              <div className="bg-muted/50 rounded-lg p-4 text-foreground leading-relaxed whitespace-pre-wrap">
                {note.description}
              </div>
            </div>
          </div>

          {/* Tags et catégories */}
          <div className="flex items-center gap-2 pt-4 border-t border-border">
            <Badge
              className={`text-sm px-3 py-1 transition-all duration-200 hover:scale-105 ${categoryColors[note.category]}`}
            >
              {categoryLabels[note.category]}
            </Badge>
            <Badge
              variant="outline"
              className={`text-sm px-3 py-1 transition-all duration-200 hover:scale-105 ${tagColors[note.tag]}`}
            >
              {tagLabels[note.tag]}
            </Badge>
          </div>

          {/* Informations supplémentaires */}
          <div className="text-xs text-muted-foreground pt-2 border-t border-border">
            <p>ID de la note: {note.id}</p>
            <p>Dernière modification: {formatDate(note.date)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 