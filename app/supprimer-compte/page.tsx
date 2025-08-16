"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Trash2, AlertTriangle, Shield, Mail, UserX } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SupprimerComptePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    reason: "",
    confirmation: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleGoBack = () => {
    router.back()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    if (!formData.email || !formData.password || formData.confirmation !== "SUPPRIMER") {
      alert("Veuillez remplir tous les champs obligatoires et confirmer la suppression")
      return
    }

    setIsLoading(true)
    
    // Simulation d'un délai de traitement
    setTimeout(() => {
      setIsLoading(false)
      setShowConfirmation(true)
    }, 2000)
  }

  const handleConfirmDeletion = () => {
    alert("Votre compte a été supprimé. Vous recevrez un email de confirmation.")
    router.push("/auth")
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
            Supprimer mon compte
          </h1>
          <p className="text-muted-foreground mt-2">
            Supprimer définitivement votre compte et toutes vos données
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* Avertissement important */}
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Attention :</strong> La suppression de votre compte est irréversible. 
              Toutes vos données seront définitivement supprimées et ne pourront pas être récupérées.
            </AlertDescription>
          </Alert>

          {/* Conséquences de la suppression */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserX className="h-5 w-5 text-red-600" />
                Conséquences de la suppression
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Avant de procéder à la suppression de votre compte, veuillez prendre 
                connaissance des conséquences suivantes :
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Trash2 className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Suppression définitive</h3>
                    <p className="text-sm text-muted-foreground">
                      Votre compte et toutes vos données seront supprimés de manière 
                      irréversible. Cette action ne peut pas être annulée.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Trash2 className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Perte de données</h3>
                    <p className="text-sm text-muted-foreground">
                      Toutes vos notes, événements, préférences et autres données 
                      personnelles seront définitivement effacés.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Trash2 className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Impossibilité de récupération</h3>
                    <p className="text-sm text-muted-foreground">
                      Une fois supprimé, votre compte ne pourra pas être restauré. 
                      Vous devrez créer un nouveau compte si vous souhaitez utiliser 
                      nos services à nouveau.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternatives */}
          <Card>
            <CardHeader>
              <CardTitle>Alternatives à la suppression</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Avant de supprimer votre compte, considérez ces alternatives :
              </p>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Désactiver temporairement</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez désactiver votre compte temporairement au lieu de le supprimer. 
                    Cela vous permettra de le réactiver plus tard si vous le souhaitez.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Exporter vos données</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous vous recommandons d'exporter vos données avant la suppression 
                    pour conserver une copie de vos informations importantes.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/export-donnees")}
                    className="mt-2"
                  >
                    Exporter mes données
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Nous contacter</h3>
                  <p className="text-sm text-muted-foreground">
                    Si vous rencontrez des problèmes avec votre compte, notre équipe 
                    peut vous aider à les résoudre.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/contact")}
                    className="mt-2"
                  >
                    Contacter le support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulaire de suppression */}
          {!showConfirmation ? (
            <Card>
              <CardHeader>
                <CardTitle>Demande de suppression</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                {/* Mot de passe */}
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Votre mot de passe actuel"
                    required
                  />
                </div>

                {/* Raison */}
                <div className="space-y-2">
                  <Label htmlFor="reason">Raison de la suppression (optionnel)</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => handleInputChange("reason", e.target.value)}
                    placeholder="Si vous le souhaitez, expliquez pourquoi vous supprimez votre compte..."
                    rows={3}
                  />
                </div>

                {/* Confirmation */}
                <div className="space-y-2">
                  <Label htmlFor="confirmation">
                    Tapez "SUPPRIMER" pour confirmer *
                  </Label>
                  <Input
                    id="confirmation"
                    type="text"
                    value={formData.confirmation}
                    onChange={(e) => handleInputChange("confirmation", e.target.value)}
                    placeholder="SUPPRIMER"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Cette action est irréversible. Assurez-vous d'avoir sauvegardé 
                    toutes les données importantes.
                  </p>
                </div>

                {/* Bouton de suppression */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.email || !formData.password || formData.confirmation !== "SUPPRIMER" || isLoading}
                    variant="destructive"
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Demander la suppression
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Confirmation finale */
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Confirmation finale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Dernière chance :</strong> Êtes-vous absolument sûr de vouloir 
                    supprimer votre compte ? Cette action ne peut pas être annulée.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    En cliquant sur "Confirmer la suppression", vous acceptez que :
                  </p>
                  
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Votre compte sera définitivement supprimé</li>
                    <li>• Toutes vos données seront irréversiblement effacées</li>
                    <li>• Vous ne pourrez plus accéder à vos informations</li>
                    <li>• Cette action ne peut pas être annulée</li>
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={handleConfirmDeletion}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Confirmer la suppression
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informations légales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Informations légales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Droit à l'effacement</h3>
                  <p className="text-sm text-muted-foreground">
                    Conformément au RGPD, vous avez le droit de demander la suppression 
                    de vos données personnelles. Nous traiterons votre demande dans 
                    un délai maximum de 30 jours.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Conservation légale</h3>
                  <p className="text-sm text-muted-foreground">
                    Certaines données peuvent être conservées plus longtemps si la loi 
                    l'exige (par exemple, pour des raisons fiscales ou comptables).
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Sauvegardes</h3>
                  <p className="text-sm text-muted-foreground">
                    Les sauvegardes de sécurité peuvent contenir vos données pendant 
                    une période limitée avant d'être automatiquement supprimées.
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
                Si vous avez des questions ou rencontrez des difficultés, 
                n'hésitez pas à nous contacter :
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