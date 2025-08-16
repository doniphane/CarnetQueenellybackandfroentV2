"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserCheck, Shield, Database, Eye, Lock, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PolitiqueConfidentialitePage() {
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
            Politique de confidentialité
          </h1>
          <p className="text-muted-foreground mt-2">
            Protection de vos données personnelles sur Mon Carnet de Notes
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
                Notre engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Mon Carnet de Notes s'engage à protéger votre vie privée et vos données 
                personnelles. Cette politique de confidentialité explique comment nous 
                collectons, utilisons et protégeons vos informations conformément au 
                Règlement Général sur la Protection des Données (RGPD).
              </p>
              
              <p className="text-sm text-muted-foreground">
                En utilisant notre service, vous acceptez les pratiques décrites dans 
                cette politique de confidentialité.
              </p>
            </CardContent>
          </Card>

          {/* Responsable du traitement */}
          <Card>
            <CardHeader>
              <CardTitle>Responsable du traitement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Mon Carnet de Notes</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>123 Rue de la Paix, 75001 Paris, France</p>
                  <p>Email : privacy@moncarnet.fr</p>
                  <p>Téléphone : +33 1 23 45 67 89</p>
                  <p>SIRET : 123 456 789 00012</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Données collectées */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Données que nous collectons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Données d'identification */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Données d'identification</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    <span>Adresse email (obligatoire)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    <span>Mot de passe (obligatoire)</span>
                  </div>
                </div>
              </div>

              {/* Données de contenu */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Données de contenu</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>Notes et documents que vous créez</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>Événements et rendez-vous</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>Préférences et paramètres</span>
                  </div>
                </div>
              </div>

              {/* Données techniques */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Données techniques</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Adresse IP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Type de navigateur et système d'exploitation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Pages visitées et actions effectuées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Horodatage des connexions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finalités du traitement */}
          <Card>
            <CardHeader>
              <CardTitle>Finalités du traitement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Fourniture du service</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous utilisons vos données pour vous permettre d'accéder à votre espace 
                    personnel, créer et gérer vos notes et événements.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Sécurité et authentification</h3>
                  <p className="text-sm text-muted-foreground">
                    Vos données sont utilisées pour sécuriser votre compte et prévenir 
                    les accès non autorisés.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Support client</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous utilisons vos informations pour répondre à vos demandes d'aide 
                    et améliorer notre service.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Amélioration du service</h3>
                  <p className="text-sm text-muted-foreground">
                    Les données anonymisées nous aident à comprendre l'utilisation du 
                    site et à améliorer nos fonctionnalités.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base légale */}
          <Card>
            <CardHeader>
              <CardTitle>Base légale du traitement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Exécution du contrat</h3>
                  <p className="text-sm text-muted-foreground">
                    Le traitement de vos données est nécessaire pour fournir le service 
                    que vous avez demandé en créant un compte.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Intérêt légitime</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous traitons certaines données pour améliorer nos services et 
                    assurer la sécurité de notre plateforme.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Consentement</h3>
                  <p className="text-sm text-muted-foreground">
                    Pour certains traitements optionnels (cookies d'analyse), nous 
                    demandons votre consentement explicite.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Durée de conservation */}
          <Card>
            <CardHeader>
              <CardTitle>Durée de conservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Données du compte</h3>
                  <p className="text-sm text-muted-foreground">
                    Vos données personnelles sont conservées tant que votre compte est 
                    actif. En cas d'inactivité prolongée (2 ans), nous vous contacterons 
                    avant de supprimer définitivement vos données.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Données de contenu</h3>
                  <p className="text-sm text-muted-foreground">
                    Vos notes et événements sont conservés tant que votre compte existe. 
                    Vous pouvez les supprimer à tout moment.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Données techniques</h3>
                  <p className="text-sm text-muted-foreground">
                    Les logs de connexion sont conservés pendant 12 mois pour des raisons 
                    de sécurité, puis anonymisés.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partage des données */}
          <Card>
            <CardHeader>
              <CardTitle>Partage des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Nous ne vendons, n'échangeons ni ne louons vos données personnelles 
                à des tiers. Nous ne partageons vos informations que dans les cas suivants :
              </p>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Prestataires de services</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous utilisons des prestataires de confiance pour l'hébergement 
                    et l'infrastructure technique. Ils sont soumis à des obligations 
                    strictes de confidentialité.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Obligations légales</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous pouvons être amenés à partager vos données si la loi l'exige 
                    ou pour protéger nos droits et notre sécurité.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Sécurité des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Nous mettons en place des mesures de sécurité appropriées pour protéger 
                vos données personnelles :
              </p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Chiffrement SSL/TLS pour toutes les communications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Mots de passe hashés et salés</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Accès restreint aux données personnelles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Sauvegardes sécurisées et régulières</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Surveillance continue de la sécurité</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vos droits RGPD */}
          <Card>
            <CardHeader>
              <CardTitle>Vos droits RGPD</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Droit d'accès</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez demander une copie de toutes les données que nous 
                    détenons sur vous.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Droit de rectification</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez corriger ou mettre à jour vos informations personnelles.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Droit à l'effacement</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez demander la suppression de vos données personnelles 
                    (droit à l'oubli).
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Droit à la portabilité</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez recevoir vos données dans un format structuré et 
                    les transférer à un autre responsable de traitement.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Droit d'opposition</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez vous opposer au traitement de vos données pour 
                    certaines finalités.
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Pour exercer vos droits, contactez-nous à{" "}
                  <a href="mailto:privacy@moncarnet.fr" className="text-primary hover:underline">
                    privacy@moncarnet.fr
                  </a>
                  . Nous répondrons dans un délai maximum de 30 jours.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact DPO */}
          <Card>
            <CardHeader>
              <CardTitle>Contact et Délégué à la Protection des Données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Délégué à la Protection des Données</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Email : dpo@moncarnet.fr</p>
                  <p>Adresse : 123 Rue de la Paix, 75001 Paris, France</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Autorité de contrôle</h3>
                <p className="text-sm text-muted-foreground">
                  Vous avez le droit de déposer une plainte auprès de la CNIL 
                  (Commission Nationale de l'Informatique et des Libertés) si vous 
                  estimez que vos droits ne sont pas respectés.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>CNIL - 3 Place de Fontenoy, 75007 Paris</p>
                  <p>Site web : <a href="https://www.cnil.fr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mise à jour */}
          <Card>
            <CardHeader>
              <CardTitle>Mise à jour de cette politique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Cette politique de confidentialité peut être mise à jour pour refléter 
                les changements dans nos pratiques ou pour des raisons légales. 
                Nous vous informerons de toute modification importante.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
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