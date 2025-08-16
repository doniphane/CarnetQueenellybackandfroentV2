"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, UserCheck, Download, Trash2, Edit, Eye, Mail, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DroitsRgpdPage() {
  const router = useRouter()
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    request: "",
    reason: ""
  })

  const handleGoBack = () => {
    router.back()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitRequest = (right: string) => {
    // Ici vous pourriez envoyer la demande à votre backend
    console.log(`Demande de ${right}:`, formData)
    alert(`Votre demande de ${right} a été envoyée. Nous vous répondrons dans les 30 jours.`)
    setSelectedRight(null)
    setFormData({ email: "", name: "", request: "", reason: "" })
  }

  const rights = [
    {
      id: "access",
      title: "Droit d'accès",
      description: "Obtenir une copie de toutes vos données personnelles",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      id: "rectification",
      title: "Droit de rectification",
      description: "Corriger ou mettre à jour vos informations personnelles",
      icon: Edit,
      color: "text-green-600"
    },
    {
      id: "erasure",
      title: "Droit à l'effacement",
      description: "Demander la suppression de vos données (droit à l'oubli)",
      icon: Trash2,
      color: "text-red-600"
    },
    {
      id: "portability",
      title: "Droit à la portabilité",
      description: "Recevoir vos données dans un format structuré",
      icon: Download,
      color: "text-purple-600"
    },
    {
      id: "objection",
      title: "Droit d'opposition",
      description: "Vous opposer au traitement de vos données",
      icon: UserCheck,
      color: "text-orange-600"
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
            Vos droits RGPD
          </h1>
          <p className="text-muted-foreground mt-2">
            Exercer vos droits relatifs à la protection de vos données personnelles
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
                <Shield className="h-5 w-5" />
                Vos droits selon le RGPD
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Le Règlement Général sur la Protection des Données (RGPD) vous confère 
                plusieurs droits concernant vos données personnelles. Vous pouvez exercer 
                ces droits en nous contactant via les formulaires ci-dessous.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Délai de réponse :</strong> Nous nous engageons à répondre 
                  à votre demande dans un délai maximum de 30 jours.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Liste des droits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rights.map((right) => {
              const IconComponent = right.icon
              return (
                <Card key={right.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <IconComponent className={`h-5 w-5 ${right.color}`} />
                      {right.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {right.description}
                    </p>
                    
                    <Button
                      onClick={() => setSelectedRight(right.id)}
                      className="w-full"
                    >
                      Exercer ce droit
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Formulaire de demande */}
          {selectedRight && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Demande : {rights.find(r => r.id === selectedRight)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="request">Détails de votre demande *</Label>
                  <Textarea
                    id="request"
                    value={formData.request}
                    onChange={(e) => handleInputChange("request", e.target.value)}
                    placeholder="Décrivez votre demande en détail..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Raison de votre demande (optionnel)</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => handleInputChange("reason", e.target.value)}
                    placeholder="Si applicable, expliquez pourquoi vous faites cette demande..."
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleSubmitRequest(selectedRight)}
                    disabled={!formData.email || !formData.name || !formData.request}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer la demande
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedRight(null)
                      setFormData({ email: "", name: "", request: "", reason: "" })
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informations supplémentaires */}
          <Card>
            <CardHeader>
              <CardTitle>Informations importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Vérification d'identité</h3>
                  <p className="text-sm text-muted-foreground">
                    Pour protéger vos données, nous pouvons vous demander de vérifier 
                    votre identité avant de traiter votre demande.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Délai de traitement</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous traiterons votre demande dans un délai maximum de 30 jours. 
                    Pour les demandes complexes, ce délai peut être prolongé de 2 mois.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Gratuité</h3>
                  <p className="text-sm text-muted-foreground">
                    L'exercice de vos droits RGPD est gratuit. Nous ne facturons 
                    aucun frais pour traiter vos demandes.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Refus de demande</h3>
                  <p className="text-sm text-muted-foreground">
                    Dans certains cas, nous pouvons refuser votre demande si elle 
                    est manifestement infondée ou excessive. Nous vous expliquerons 
                    alors les raisons de ce refus.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact direct */}
          <Card>
            <CardHeader>
              <CardTitle>Contact direct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Vous pouvez également nous contacter directement pour exercer vos droits :
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
                <p>Adresse : 123 Rue de la Paix, 75001 Paris, France</p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note :</strong> Si vous n'êtes pas satisfait de notre réponse, 
                  vous avez le droit de déposer une plainte auprès de la CNIL.
                </p>
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