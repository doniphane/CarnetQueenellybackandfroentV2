"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Crown } from "lucide-react"
import { usePublicCalendars } from "@/hooks/usePublicCalendars"
import { useAuth } from "@/hooks/useAuth"

interface PublicCalendarsNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function PublicCalendarsNav({ activeSection, onSectionChange }: PublicCalendarsNavProps) {
  const { publicCalendars, isCalendarOwner } = usePublicCalendars()
  const { user } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)

  // Si aucun calendrier public
  if (publicCalendars.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {/* En-tête des calendriers publics */}
      <div className="flex items-center justify-between px-3 py-1">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Calendriers Publics
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "−" : "+"}
        </Button>
      </div>

      {/* Liste des calendriers publics */}
      {isExpanded && (
        <div className="space-y-1">
          {publicCalendars.map((calendar) => {
            const isActive = activeSection === `public-${calendar.id}`
            const isOwner = user && isCalendarOwner(calendar.id, String(user.id))

            return (
              <Button
                key={calendar.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-12 transition-all duration-200 hover:scale-105 hover:shadow-sm animate-in fade-in-0 slide-in-from-left-4 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                }`}
                style={{ 
                  borderLeft: `3px solid ${calendar.color}`,
                  animationDelay: `${publicCalendars.indexOf(calendar) * 50}ms`
                }}
                onClick={() => onSectionChange(`public-${calendar.id}`)}
              >
                <Calendar className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{calendar.name}</span>
                    {isOwner && (
                      <Crown className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-xs opacity-70 truncate">
                    Par {calendar.ownerName}
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      )}

      {/* Résumé des calendriers */}
      {!isExpanded && (
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{publicCalendars.length} calendrier{publicCalendars.length > 1 ? 's' : ''} public{publicCalendars.length > 1 ? 's' : ''}</span>
          </div>
        </div>
      )}
    </div>
  )
} 