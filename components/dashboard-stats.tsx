"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StickyNote, Calendar, CheckCircle, Clock, TrendingUp } from "lucide-react"
import type { Note } from "@/types/note"
import type { Event } from "@/types/event"

interface DashboardStatsProps {
  notes: Note[]
  events: Event[]
}

export function DashboardStats({ notes, events }: DashboardStatsProps) {
  const totalNotes = notes.length
  const totalEvents = events.length
  const completedTasks = [...notes, ...events].filter((item) => item.tag === "termine").length
  const inProgressTasks = [...notes, ...events].filter((item) => item.tag === "en-cours").length

  const now = new Date()
  const upcomingEvents = events.filter((event) => {
    const eventDateTime = new Date(event.date)
    if (event.startTime) {
      const [hours, minutes] = event.startTime.split(":").map(Number)
      eventDateTime.setHours(hours, minutes, 0, 0)
    }
    return eventDateTime > now
  }).length

  const stats = [
    {
      title: "Notes publiques",
      value: totalNotes,
      icon: StickyNote,
      description: "Total des notes créées",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Événements",
      value: totalEvents,
      icon: Calendar,
      description: "Total des événements",
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Tâches terminées",
      value: completedTasks,
      icon: CheckCircle,
      description: "Notes et événements terminés",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "En cours",
      value: inProgressTasks,
      icon: Clock,
      description: "Tâches en progression",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "À venir",
      value: upcomingEvents,
      icon: TrendingUp,
      description: "Événements futurs",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.title}
            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground transition-colors duration-200">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 transition-all duration-300 hover:scale-110 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground transition-all duration-300 hover:text-accent">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1 transition-colors duration-200">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
