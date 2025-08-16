"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp } from "lucide-react"
import type { Note } from "@/types/note"
import type { Event } from "@/types/event"

interface DashboardActivityChartProps {
  notes: Note[]
  events: Event[]
}

export function DashboardActivityChart({ notes, events }: DashboardActivityChartProps) {
  // Get activity data for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date
  })

  const activityData = last7Days.map((date) => {
    const dayNotes = notes.filter((note) => {
      const noteDate = new Date(note.createdAt)
      return (
        noteDate.getDate() === date.getDate() &&
        noteDate.getMonth() === date.getMonth() &&
        noteDate.getFullYear() === date.getFullYear()
      )
    }).length

    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.createdAt)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    }).length

    return {
      date: date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" }),
      notes: dayNotes,
      events: dayEvents,
      total: dayNotes + dayEvents,
    }
  })

  const maxActivity = Math.max(...activityData.map((d) => d.total), 1)

  // Calculate category distribution
  const categoryStats = {
    personnel: [...notes, ...events].filter((item) => item.category === "personnel").length,
    travail: [...notes, ...events].filter((item) => item.category === "travail").length,
    autre: [...notes, ...events].filter((item) => item.category === "autre").length,
  }

  const totalItems = Object.values(categoryStats).reduce((sum, count) => sum + count, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Activité des 7 derniers jours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activityData.map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 text-xs text-muted-foreground font-medium">{day.date}</div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-chart-1 to-chart-2 rounded-full transition-all duration-300"
                      style={{ width: `${(day.total / maxActivity) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground w-8 text-right">{day.total}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Répartition par catégorie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, count]) => {
              const percentage = totalItems > 0 ? (count / totalItems) * 100 : 0
              const categoryLabels = {
                personnel: "Personnel",
                travail: "Travail",
                autre: "Autre",
              }
              const categoryColors = {
                personnel: "bg-chart-1",
                travail: "bg-chart-2",
                autre: "bg-chart-3",
              }

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {count} ({Math.round(percentage)}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        categoryColors[category as keyof typeof categoryColors]
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
