"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Plus } from "lucide-react"
import { usePublicCalendars } from "@/hooks/usePublicCalendars"
import { useAuth } from "@/hooks/useAuth"
// Couleurs disponibles pour les calendriers
const CALENDAR_COLORS = [
  "#3B82F6", // bleu
  "#EF4444", // rouge
  "#10B981", // vert
  "#F59E0B", // jaune
  "#8B5CF6", // violet
  "#EC4899", // rose
  "#06B6D4", // cyan
  "#84CC16", // lime
  "#F97316", // orange
  "#6366F1", // indigo
]

export function CreatePublicCalendarSidebar() {
  const { createPublicCalendar } = usePublicCalendars()
  const { user } = useAuth()

  // États pour le formulaire
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [calendarName, setCalendarName] = useState("")
  const [calendarDescription, setCalendarDescription] = useState("")
  const [calendarColor, setCalendarColor] = useState(CALENDAR_COLORS[0])

  // Fonction pour créer un calendrier public
  const handleCreateCalendar = async () => {
    console.log("Tentative de création de calendrier...")
    console.log("Nom du calendrier:", calendarName)
    console.log("Utilisateur:", user)
    
    if (!calendarName.trim()) {
      console.log("Erreur: Nom du calendrier vide")
      alert("Veuillez entrer un nom pour le calendrier")
      return
    }
    
    if (!user) {
      console.log("Erreur: Utilisateur non connecté")
      alert("Vous devez être connecté pour créer un calendrier")
      return
    }

    try {
      const newCalendar = await createPublicCalendar(
        calendarName,
        calendarDescription,
        calendarColor,
        String(user.id) || "user-id",
        user.email?.split('@')[0] || "Utilisateur",
        user.email || "user@example.com"
      )
      
      console.log("Calendrier créé avec succès:", newCalendar)
      alert("Calendrier public créé avec succès !")

      // Réinitialiser le formulaire
      setCalendarName("")
      setCalendarDescription("")
      setCalendarColor(CALENDAR_COLORS[0])
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Erreur lors de la création du calendrier:", error)
      alert("Erreur lors de la création du calendrier")
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Nouveau calendrier public
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un calendrier public</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="calendar-name">Nom du calendrier</Label>
            <Input
              id="calendar-name"
              value={calendarName}
              onChange={(e) => setCalendarName(e.target.value)}
              placeholder="Ex: Mon calendrier personnel"
            />
          </div>
          
          <div>
            <Label htmlFor="calendar-description">Description (optionnel)</Label>
            <Textarea
              id="calendar-description"
              value={calendarDescription}
              onChange={(e) => setCalendarDescription(e.target.value)}
              placeholder="Description de votre calendrier..."
              rows={3}
            />
          </div>
          
          <div>
            <Label>Couleur du calendrier</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {CALENDAR_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    calendarColor === color ? "border-foreground scale-110" : "border-border"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCalendarColor(color)}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Note :</strong> Votre calendrier sera visible par tous les utilisateurs de l'application.
              Seul vous pourrez le modifier.
            </p>
          </div>
          
          <Button onClick={handleCreateCalendar} className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Créer le calendrier public
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 