"use client"
import { Button } from "@/components/ui/button"
import { Calendar, StickyNote, LayoutDashboard, Plus, Search, Filter, Menu, X, LogIn, LogOut, User, Settings, Shield, Users } from "lucide-react"
import { PublicCalendarsNav } from "@/components/public-calendars-nav"
import { CreatePublicCalendarSidebar } from "@/components/create-public-calendar-sidebar"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"


interface SidebarNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onAddNote: () => void
  onAddEvent: () => void
  onSearch: () => void
  onFilter: () => void
}

export function SidebarNavigation({
  activeSection,
  onSectionChange,
  onAddNote,
  onAddEvent,
  onSearch,
  onFilter,
}: SidebarNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()


  const navigationItems = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: LayoutDashboard,
      description: "Vue d'ensemble",
    },
    {
      id: "notes",
      label: "Mes Notes",
      icon: StickyNote,
      description: "Toutes mes notes",
    },
    {
      id: "calendar",
      label: "Calendrier",
      icon: Calendar,
      description: "Emploi du temps de Nelly",
    },
    {
      id: "public-calendars",
      label: "Calendriers Publics",
      icon: Users,
      description: "Calendriers partagés",
    },
  ]

  const handleSectionChange = (section: string) => {
    onSectionChange(section)
    setIsMobileMenuOpen(false)
  }

  const handleLogin = () => {
    router.push('/auth')
  }

  const handleLogout = async () => {
    await logout()
    router.push('/auth')
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-background/80 backdrop-blur-sm border border-border"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in-0 duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
        fixed md:relative inset-y-0 left-0 z-50 w-72 sm:w-80 md:w-64 lg:w-72 h-screen bg-sidebar border-r border-sidebar-border flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        animate-in slide-in-from-left-0 duration-300
      `}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-sidebar-border animate-in fade-in-0 slide-in-from-top-2 duration-500">
          <h1 className="text-lg sm:text-xl font-bold text-sidebar-foreground leading-tight">Mon Carnet de Notes</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Mon petit coin de vie</p>
        </div>

        {/* Quick Actions */}
        <div className="p-3 sm:p-4 border-b border-sidebar-border animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <div className="space-y-2">
            <Button
              className="w-full justify-start gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-md text-sm"
              size="sm"
              onClick={onAddNote}
            >
              <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              <span className="truncate">Nouvelle note</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-sm text-sm"
              size="sm"
              onClick={onAddEvent}
            >
              <Calendar className="h-4 w-4" />
              <span className="truncate">Ajouter événement</span>
            </Button>
            <CreatePublicCalendarSidebar />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4 pb-20 animate-in fade-in-0 slide-in-from-top-6 duration-900 overflow-y-auto">
          <div className="space-y-4">
            {/* Navigation principale */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Navigation
              </h3>
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-2 sm:gap-3 transition-all duration-200 hover:scale-105 text-sm ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                        : "hover:bg-sidebar-muted"
                    }`}
                    onClick={() => handleSectionChange(item.id)}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-medium truncate">{item.label}</div>
                      <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>

            {/* Actions rapides */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </h3>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 sm:gap-3 hover:bg-sidebar-muted transition-all duration-200 hover:scale-105 text-sm"
                onClick={onSearch}
              >
                <Search className="h-4 w-4 flex-shrink-0" />
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium truncate">Rechercher</div>
                  <div className="text-xs text-muted-foreground truncate">Trouver rapidement</div>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 sm:gap-3 hover:bg-sidebar-muted transition-all duration-200 hover:scale-105 text-sm"
                onClick={onFilter}
              >
                <Filter className="h-4 w-4 flex-shrink-0" />
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium truncate">Filtrer</div>
                  <div className="text-xs text-muted-foreground truncate">Affiner les résultats</div>
                </div>
              </Button>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-sidebar-border animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
          {/* Theme Toggle */}
          <div className="mb-4 flex justify-center">
            <ThemeToggle />
          </div>
          
          {isAuthenticated ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-sidebar-muted/50">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sidebar-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-sidebar-primary-foreground">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-sidebar-foreground truncate">
                    {user?.email || "Utilisateur"}
                  </div>
                  <div className="text-xs text-muted-foreground">Connecté</div>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 sm:gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 text-sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Se déconnecter</span>
              </Button>
            </div>
          ) : (
            <Button
              className="w-full justify-start gap-2 sm:gap-3 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground transition-all duration-200 text-sm"
              onClick={handleLogin}
            >
              <LogIn className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Se connecter</span>
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
