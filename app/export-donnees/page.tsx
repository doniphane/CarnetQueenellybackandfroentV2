"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Download, Database, FileText, Calendar, User, Mail, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ExportDonneesPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [selectedData, setSelectedData] = useState({
    profile: true,
    notes: true,
    events: true,
    preferences: true,
    activity: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleGoBack = () => {
    router.back()
  }

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setSelectedData(prev => ({
      ...prev,
      [key]: checked
    }))
  }

  const handleExport = async () => {
    if (!email) {
      alert("Veuillez saisir votre adresse email")
      return
    }

    setIsLoading(true)
    
    // Simulation d'un délai de traitement
    setTimeout(() => {
      setIsLoading(false)
      alert("Votre demande d'export a été enregistrée. Vous recevrez un email avec vos données dans les 30 jours.")
    }, 2000)
  }

  const dataTypes = [
    {
      key: "profile",
      title: "Profil utilisateur",
      description: "Informations de base de votre compte (email, date de création, etc.)",
      icon: User
    },
    {
      key: "notes",
      title: "Notes et documents",
      description: "Toutes vos notes publiques et privées",
      icon: FileText
    },
    {
      key: "events",
      title: "Événements et calendrier",
      description: "Vos événements, rendez-vous et emploi du temps",
      icon: Calendar
    },
    {
      key: "preferences",
      title: "Préférences",
      description: "Vos paramètres et préférences d'affichage",
      icon: Database
    },
    {
      key: "activity",
      title: "Historique d'activité",
      description: "Logs de connexion et actions effectuées (optionnel)",
      icon: Database
    }
  ]

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
            Exporter mes données
          </h1>
          <p className="text-muted-foreground mt-2">
            Télécharger une copie de vos données personnelles
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
                <Download className="h-5 w-5" />
                Droit à la portabilité des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Conformément au RGPD, vous avez le droit de recevoir une copie de vos 
                données personnelles dans un format structuré, couramment utilisé et 
                lisible par machine. Cette fonctionnalité vous permet d'exporter vos 
                données pour les transférer vers un autre service si vous le souhaitez.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Format d'export :</strong> Vos données seront fournies au format JSON, 
                  un format standard facilement lisible et réutilisable.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Formulaire d'export */}
          <Card>
            <CardHeader>
              <CardTitle>Demande d'export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Nous enverrons vos données exportées à cette adresse email.
                </p>
              </div>

              {/* Types de données */}
              <div className="space-y-4">
                <Label>Types de données à exporter</Label>
                
                <div className="space-y-3">
                  {dataTypes.map((dataType) => {
                    const IconComponent = dataType.icon
                    return (
                      <div key={dataType.key} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={dataType.key}
                          checked={selectedData[dataType.key as keyof typeof selectedData]}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange(dataType.key, checked as boolean)
                          }
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                            <Label 
                              htmlFor={dataType.key}
                              className="text-sm font-medium cursor-pointer"
                            >
                              {dataType.title}
                            </Label>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {dataType.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bouton d'export */}
              <div className="flex gap-3">
                <Button
                  onClick={handleExport}
                  disabled={!email || isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Demander l'export
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Informations sur le processus */}
          <Card>
            <CardHeader>
              <CardTitle>Processus d'export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Demande d'export</h3>
                    <p className="text-sm text-muted-foreground">
                      Vous soumettez votre demande via ce formulaire en spécifiant 
                      votre email et les types de données à exporter.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Vérification d'identité</h3>
                    <p className="text-sm text-muted-foreground">
                      Nous vérifions votre identité pour protéger vos données 
                      et nous assurons que vous êtes bien le propriétaire du compte.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Préparation des données</h3>
                    <p className="text-sm text-muted-foreground">
                      Nous préparons vos données dans un format structuré et 
                      sécurisé, en incluant uniquement les informations que vous avez demandées.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Envoi par email</h3>
                    <p className="text-sm text-muted-foreground">
                      Vous recevez un email avec un lien sécurisé pour télécharger 
                      vos données exportées.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Délais et sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Délais et sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Délai de traitement</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous nous engageons à traiter votre demande d'export dans un délai 
                    maximum de 30 jours. Pour les comptes avec beaucoup de données, 
                    ce délai peut être prolongé.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Sécurité des données</h3>
                  <p className="text-sm text-muted-foreground">
                    Vos données exportées sont chiffrées et envoyées via un lien 
                    sécurisé. Le lien expire automatiquement après 7 jours pour 
                    garantir la sécurité de vos informations.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Format des données</h3>
                  <p className="text-sm text-muted-foreground">
                    Les données sont exportées au format JSON, un standard ouvert 
                    et largement supporté. Chaque export inclut un fichier README 
                    expliquant la structure des données.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Besoin d'aide ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Si vous rencontrez des difficultés ou avez des questions concernant 
                l'export de vos données, n'hésitez pas à nous contacter :
              </p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email : privacy@moncarnet.fr</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>DPO : dpo@moncarnet.fr</span>
                </div>
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