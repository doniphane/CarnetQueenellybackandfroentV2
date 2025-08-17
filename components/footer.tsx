"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Shield, 
  FileText, 
  UserCheck,
  Building
} from "lucide-react"

// Interface pour les props du composant
interface FooterProps {
  className?: string
}

export function Footer({ className = "" }: FooterProps) {
  // Fonction pour ouvrir les liens dans un nouvel onglet
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Fonction pour gérer les clics sur les liens internes
  const handleInternalLink = (path: string) => {
    // Ici vous pourriez utiliser Next.js router pour la navigation
    // Pour l'instant, on utilise window.location
    window.location.href = path
  }

  return (
    <footer className={`bg-background border-t relative z-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section principale du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Informations de l'entreprise */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Mon Carnet de Notes</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Mon espace personnel pour organiser mes notes et mon emploi du temps.
         
            </p>
            
            {/* Informations de contact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>antredequeennelly@protonmail.com</span>
              </div>
            </div>
          </div>

          {/* Liens légaux */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Informations légales</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground"
                onClick={() => handleInternalLink('/mentions-legales')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Mentions légales
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground"
                onClick={() => handleInternalLink('/politique-cookies')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Politique de cookies
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground"
                onClick={() => handleInternalLink('/politique-confidentialite')}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Politique de confidentialité
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Section inférieure */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mon Carnet de Notes. Tous droits réservés.
          </div>

          {/* Liens sociaux et légaux */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Version 1.0.0</span>
            <span>•</span>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-muted-foreground hover:text-foreground"
              onClick={() => handleInternalLink('/accessibilite')}
            >
              Accessibilité
            </Button>
            <span>•</span>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-muted-foreground hover:text-foreground"
              onClick={() => handleInternalLink('/plan-du-site')}
            >
              Plan du site
            </Button>
          </div>
        </div>

      
      </div>
    </footer>
  )
} 