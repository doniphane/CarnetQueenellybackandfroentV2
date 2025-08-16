"use client"
import { Button } from "@/components/ui/button"
import { Calendar, StickyNote, LayoutDashboard, Plus, Search, Filter, Menu, X, LogIn, LogOut, User, Settings, Shield } from "lucide-react"
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
      description: "Emploi du temps",
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
        fixed md:relative inset-y-0 left-0 z-40 w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        animate-in slide-in-from-left-0 duration-300
      `}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border animate-in fade-in-0 slide-in-from-top-2 duration-500">
          <h1 className="text-xl font-bold text-sidebar-foreground">Mon Carnet de Notes</h1>
          <p className="text-sm text-muted-foreground mt-1">Mon petit coin de vie</p>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-sidebar-border animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <div className="space-y-2">
            <Button
              className="w-full justify-start gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-md"
              size="sm"
              onClick={onAddNote}
            >
              <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              Nouvelle note
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-sm"
              size="sm"
              onClick={onAddEvent}
            >
              <Calendar className="h-4 w-4" />
              Ajouter événement
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 animate-in fade-in-0 slide-in-from-top-6 duration-900">
          <div className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 h-12 transition-all duration-200 hover:scale-105 hover:shadow-sm animate-in fade-in-0 slide-in-from-left-4 ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                  }`}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  onClick={() => handleSectionChange(item.id)}
                >
                  <Icon className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Search & Filter */}
        <div className="p-4 border-t border-sidebar-border animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-sm"
              size="sm"
              onClick={onSearch}
            >
              <Search className="h-4 w-4" />
              Rechercher
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-sm"
              size="sm"
              onClick={onFilter}
            >
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
            
            {/* Authentication Section */}
            <div className="pt-2 border-t border-sidebar-border">
              {isAuthenticated ? (
                <div className="space-y-3">
                  {/* User Profile Card */}
                  <div className="bg-card/50 rounded-lg p-3 border border-sidebar-border hover:bg-card/70 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                          {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {user?.email?.split('@')[0] || 'Utilisateur'}
                          </p>
                          <Shield className="h-3 w-3 text-green-500" />
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                          Connecté
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* User Actions */}
                  <div className="space-y-1">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-sm"
                      size="sm"
                      onClick={() => {
                        // TODO: Implémenter la page des paramètres
                        console.log('Paramètres du compte')
                      }}
                    >
                      <Settings className="h-4 w-4" />
                      Paramètres
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      size="sm"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-sm"
                  size="sm"
                  onClick={handleLogin}
                >
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Button>
              )}
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  )
}
