"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Cookie, Shield, Settings } from "lucide-react"

// Interface pour définir les types de cookies
interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

// Interface pour les props du composant
interface CookieBannerProps {
  onAcceptAll: () => void
  onAcceptNecessary: () => void
  onCustomize: () => void
}

export function CookieBanner({ onAcceptAll, onAcceptNecessary, onCustomize }: CookieBannerProps) {
  // État pour gérer l'affichage de la bannière
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Vérifier si l'utilisateur a déjà fait un choix lors du chargement
  useEffect(() => {
    // Vérifier dans le localStorage si l'utilisateur a déjà fait un choix
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (!cookieConsent) {
      // Si aucun choix n'a été fait, afficher la bannière
      setIsVisible(true)
    }
  }, [])

  // Fonction pour accepter tous les cookies
  const handleAcceptAll = () => {
    // Sauvegarder le choix dans le localStorage
    localStorage.setItem("cookieConsent", JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }))
    
    // Masquer la bannière
    setIsVisible(false)
    
    // Appeler la fonction de callback
    onAcceptAll()
  }

  // Fonction pour accepter seulement les cookies nécessaires
  const handleAcceptNecessary = () => {
    // Sauvegarder le choix dans le localStorage
    localStorage.setItem("cookieConsent", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }))
    
    // Masquer la bannière
    setIsVisible(false)
    
    // Appeler la fonction de callback
    onAcceptNecessary()
  }

  // Fonction pour personnaliser les cookies
  const handleCustomize = () => {
    setShowDetails(true)
    onCustomize()
  }

  // Fonction pour fermer la bannière
  const handleClose = () => {
    setIsVisible(false)
  }

  // Si la bannière n'est pas visible, ne rien afficher
  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Icône de cookie */}
            <div className="flex-shrink-0">
              <Cookie className="h-8 w-8 text-primary" />
            </div>

            {/* Contenu principal */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Nous utilisons des cookies
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                    Certains cookies sont nécessaires au fonctionnement du site, d'autres nous aident 
                    à améliorer nos services.
                  </p>
                </div>
                
                {/* Bouton de fermeture */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Détails des cookies (affichés si demandé) */}
              {showDetails && (
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Cookies nécessaires</span>
                    <span className="text-xs text-muted-foreground">(Toujours actifs)</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    Ces cookies sont essentiels au fonctionnement du site. Ils permettent 
                    l'authentification et la sécurité.
                  </p>

                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Cookies d'analyse</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    Ces cookies nous aident à comprendre comment vous utilisez notre site 
                    pour l'améliorer.
                  </p>

                  <div className="flex items-center gap-2">
                    <Cookie className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Cookies marketing</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    Ces cookies sont utilisés pour vous proposer du contenu personnalisé.
                  </p>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAcceptNecessary}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Cookies essentiels uniquement
                </Button>
                
                <Button
                  onClick={handleCustomize}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Personnaliser
                </Button>
                
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="flex-1"
                >
                  Accepter tous les cookies
                </Button>
              </div>

              {/* Lien vers la politique de cookies */}
              <p className="text-xs text-muted-foreground">
                En continuant à utiliser ce site, vous acceptez notre{" "}
                <a 
                  href="/politique-cookies" 
                  className="text-primary hover:underline"
                >
                  politique de cookies
                </a>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 