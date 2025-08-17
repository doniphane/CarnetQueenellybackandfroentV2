"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building, Mail, Phone, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MentionsLegalesPage() {
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
            Mentions légales
          </h1>
          <p className="text-muted-foreground mt-2">
            Informations légales concernant le site Mon Carnet de Notes
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* Éditeur du site */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Éditeur du site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Mon Carnet de Notes
                </h3>
               </div>
              
         <p className="text-sm text-muted-foreground">
          Mon Carnet de Notes est un site web créé par QueenNelly.
         </p>
            </CardContent>
          </Card>

          {/* Hébergement */}
          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Vercel Inc.
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>340 S Lemon Ave #4133</p>
                  <p>Walnut, CA 91789</p>
                  <p>États-Unis</p>
                  <p>Email: privacy@vercel.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                L'ensemble de ce site relève de la législation française et internationale 
                sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
                reproduction sont réservés, y compris pour les documents téléchargeables 
                et les représentations iconographiques et photographiques.
              </p>
              
              <p className="text-sm text-muted-foreground">
                La reproduction de tout ou partie de ce site sur un support électronique 
                quel qu'il soit est formellement interdite sauf autorisation expresse 
                du directeur de la publication.
              </p>
            </CardContent>
          </Card>

          {/* Responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle>Responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Les informations contenues sur ce site sont aussi précises que possible 
                et le site est périodiquement remis à jour, mais peut toutefois contenir 
                des inexactitudes, des omissions ou des lacunes.
              </p>
              
              <p className="text-sm text-muted-foreground">
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                merci de bien vouloir le signaler par email à l'adresse antredequeennelly@protonmail.com, 
                en décrivant le problème de la manière la plus précise possible.
              </p>
              
              <p className="text-sm text-muted-foreground">
                Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et 
                sous sa seule responsabilité. En conséquence, Mon Carnet de Notes ne saurait 
                être tenu responsable d'un quelconque dommage subi par l'ordinateur de 
                l'utilisateur ou d'une quelconque perte de données consécutives au téléchargement.
              </p>
            </CardContent>
          </Card>

          {/* Liens hypertextes */}
          <Card>
            <CardHeader>
              <CardTitle>Liens hypertextes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Les liens hypertextes mis en place dans le cadre du présent site web en 
                direction d'autres ressources présentes sur le réseau Internet ne sauraient 
                engager la responsabilité de Mon Carnet de Notes.
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Le site peut-être amené à vous demander l'acceptation des cookies pour 
                des besoins de statistiques et d'affichage. Un cookie ne nous permet pas 
                de vous identifier ; il sert uniquement à enregistrer des informations 
                relatives à la navigation de votre ordinateur sur notre site.
              </p>
              
              <p className="text-sm text-muted-foreground">
                Vous pouvez à tout moment désactiver ces cookies et être libre de refuser 
                leur dépôt en prenant connaissance de notre politique de cookies.
              </p>
            </CardContent>
          </Card>

          {/* Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle>Droit applicable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Tout litige en relation avec l'utilisation du site Mon Carnet de Notes 
                est soumis au droit français. En dehors des cas où la loi ne le permet pas, 
                il est fait attribution exclusive de juridiction aux tribunaux compétents 
                de Paris.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
} 