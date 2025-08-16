"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, StickyNote, BarChart3 } from "lucide-react"

interface DashboardQuickActionsProps {
  onCreateNote: () => void
  onCreateEvent: () => void
  onViewNotes: () => void
  onViewCalendar: () => void
}

export function DashboardQuickActions({
  onCreateNote,
  onCreateEvent,
  onViewNotes,
  onViewCalendar,
}: DashboardQuickActionsProps) {
  const quickActions = [
    {
      title: "Nouvelle note",
      description: "Créer une note publique",
      icon: Plus,
      action: onCreateNote,
      variant: "default" as const,
      className: "bg-accent hover:bg-accent/90 text-accent-foreground",
    },
    {
      title: "Nouvel événement",
      description: "Ajouter au calendrier",
      icon: Calendar,
      action: onCreateEvent,
      variant: "secondary" as const,
      className: "",
    },
    {
      title: "Mes notes",
      description: "Gérer les notes",
      icon: StickyNote,
      action: onViewNotes,
      variant: "outline" as const,
      className: "",
    },
    {
      title: "Calendrier",
      description: "Voir le planning",
      icon: Calendar,
      action: onViewCalendar,
      variant: "outline" as const,
      className: "",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-accent" />
          Actions rapides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant={action.variant}
                className={`h-auto p-4 flex flex-col items-center gap-2 ${action.className}`}
                onClick={action.action}
              >
                <Icon className="h-5 w-5" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-70">{action.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
