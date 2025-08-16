"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Cookie, Shield, Settings, Clock, Database } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PolitiqueCookiesPage() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground">
            Politique de cookies
          </h1>
          <p className="text-muted-foreground mt-2">
            Informations sur l'utilisation des cookies sur Mon Carnet de Notes
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Qu'est-ce qu'un cookie ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil 
                mobile lorsque vous visitez un site web. Les cookies sont largement utilisés 
                pour faire fonctionner les sites web ou les faire fonctionner plus efficacement, 
                ainsi que pour fournir des informations aux propriétaires du site.
              </p>
              
              <p className="text-sm text-muted-foreground">
                Les cookies nous permettent de mémoriser vos préférences et de vous offrir 
                une expérience personnalisée. Ils nous aident également à comprendre comment 
                vous utilisez notre site pour l'améliorer.
              </p>
            </CardContent>
          </Card>

          {/* Types de cookies utilisés */}
          <Card>
            <CardHeader>
              <CardTitle>Types de cookies utilisés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Cookies nécessaires */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-foreground">Cookies nécessaires</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Toujours actifs
                  </span>
                </div>
                <p className="text-sm text-muted-foreground ml-7">
                  Ces cookies sont essentiels au fonctionnement du site. Ils permettent 
                  l'authentification, la sécurité et les fonctionnalités de base. Ils ne 
                  peuvent pas être désactivés.
                </p>
                <div className="ml-7 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Database className="h-3 w-3" />
                    <span>Session d'authentification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    <span>Protection CSRF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-3 w-3" />
                    <span>Préférences de langue</span>
                  </div>
                </div>
              </div>

              {/* Cookies d'analyse */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-foreground">Cookies d'analyse</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Optionnels
                  </span>
                </div>
                <p className="text-sm text-muted-foreground ml-7">
                  Ces cookies nous aident à comprendre comment vous utilisez notre site 
                  en collectant des informations anonymes. Cela nous permet d'améliorer 
                  nos services et votre expérience.
                </p>
                <div className="ml-7 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Temps passé sur le site</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-3 w-3" />
                    <span>Pages visitées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-3 w-3" />
                    <span>Fonctionnalités utilisées</span>
                  </div>
                </div>
              </div>

              {/* Cookies de personnalisation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold text-foreground">Cookies de personnalisation</h3>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    Optionnels
                  </span>
                </div>
                <p className="text-sm text-muted-foreground ml-7">
                  Ces cookies mémorisent vos préférences et vos choix pour vous offrir 
                  une expérience personnalisée lors de vos prochaines visites.
                </p>
                <div className="ml-7 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Settings className="h-3 w-3" />
                    <span>Thème (clair/sombre)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-3 w-3" />
                    <span>Préférences d'affichage</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Durée de conservation */}
          <Card>
            <CardHeader>
              <CardTitle>Durée de conservation des cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-foreground">Cookies de session</span>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    Jusqu'à la fermeture du navigateur
                  </span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Ces cookies sont automatiquement supprimés lorsque vous fermez votre navigateur.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-foreground">Cookies persistants</span>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    Jusqu'à 1 an
                  </span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Ces cookies restent sur votre appareil pendant une durée maximale d'un an 
                  ou jusqu'à ce que vous les supprimiez manuellement.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Gestion des cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Comment gérer vos cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Vous pouvez à tout moment modifier vos préférences concernant les cookies 
                en utilisant les options suivantes :
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Via notre bannière de cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Cliquez sur "Personnaliser" dans la bannière de cookies pour choisir 
                    quels types de cookies vous acceptez.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Via votre navigateur</h4>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez configurer votre navigateur pour refuser tous les cookies 
                    ou pour être informé quand un cookie est envoyé. Cependant, si vous 
                    refusez les cookies, certaines parties de notre site peuvent ne pas 
                    fonctionner correctement.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Suppression des cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez supprimer les cookies existants via les paramètres de 
                    votre navigateur. Consultez l'aide de votre navigateur pour plus 
                    d'informations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies tiers */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies tiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Notre site peut contenir des liens vers des sites web tiers ou intégrer 
                des services tiers qui peuvent utiliser leurs propres cookies. Nous n'avons 
                aucun contrôle sur ces cookies et vous devriez consulter la politique de 
                cookies de ces sites tiers.
              </p>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Services tiers utilisés :</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Vercel (hébergement et analytics)</li>
                  <li>• Google Fonts (polices de caractères)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Mise à jour de la politique */}
          <Card>
            <CardHeader>
              <CardTitle>Mise à jour de cette politique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Nous pouvons mettre à jour cette politique de cookies de temps à autre 
                pour refléter les changements dans nos pratiques ou pour d'autres raisons 
                opérationnelles, légales ou réglementaires.
              </p>
              
              <p className="text-sm text-muted-foreground">
                Nous vous encourageons à consulter régulièrement cette page pour rester 
                informé de nos pratiques en matière de cookies.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Nous contacter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Si vous avez des questions concernant notre politique de cookies, 
                n'hésitez pas à nous contacter :
              </p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Email :</strong> privacy@moncarnet.fr</p>
                <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                <p><strong>Adresse :</strong> 123 Rue de la Paix, 75001 Paris, France</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
} 