# Backend Symfony - API Platform

Ce backend Symfony avec API Platform fournit les endpoints nécessaires pour votre application Next.js de gestion de notes et d'événements.

## 🚀 Installation et démarrage

### Prérequis
- PHP 8.1+
- Composer
- MySQL/PostgreSQL
- Symfony CLI (optionnel)

### Installation
```bash
# Installer les dépendances
composer install

# Configurer la base de données dans .env
# DATABASE_URL="mysql://user:password@127.0.0.1:3306/carnetv2"

# Créer la base de données
php bin/console doctrine:database:create

# Exécuter les migrations
php bin/console doctrine:migrations:migrate

# Charger les données de test
php bin/console doctrine:fixtures:load
```

### Démarrer le serveur
```bash
# Avec Symfony CLI
symfony server:start

# Ou avec le serveur PHP intégré
php -S localhost:8000 -t public/
```

## 📚 API Endpoints

### Base URL
`http://localhost:8000/api`

### Documentation API
- **API Platform UI**: `http://localhost:8000/api`
- **OpenAPI JSON**: `http://localhost:8000/api/docs.json`

### Endpoints disponibles

#### Notes
- `GET /api/notes` - Liste toutes les notes
- `GET /api/notes/{id}` - Récupère une note
- `POST /api/notes` - Crée une nouvelle note
- `PUT /api/notes/{id}` - Met à jour une note
- `DELETE /api/notes/{id}` - Supprime une note

#### Événements
- `GET /api/events` - Liste tous les événements
- `GET /api/events/{id}` - Récupère un événement
- `POST /api/events` - Crée un nouvel événement
- `PUT /api/events/{id}` - Met à jour un événement
- `DELETE /api/events/{id}` - Supprime un événement

#### Tableau de bord
- `GET /api/dashboard/stats` - Statistiques du tableau de bord

## 🗄️ Structure des données

### Note
```json
{
  "id": 1,
  "title": "Titre de la note",
  "description": "Description de la note",
  "date": "2024-01-15",
  "category": "personnel|travail|autre",
  "tag": "en-cours|termine|a-faire",
  "createdAt": "2024-01-15T10:00:00+00:00",
  "updatedAt": "2024-01-15T10:00:00+00:00"
}
```

### Event
```json
{
  "id": 1,
  "title": "Titre de l'événement",
  "description": "Description de l'événement",
  "date": "2024-01-15",
  "startTime": "09:00",
  "endTime": "10:30",
  "category": "personnel|travail|autre",
  "tag": "en-cours|termine|a-faire",
  "createdAt": "2024-01-15T10:00:00+00:00",
  "updatedAt": "2024-01-15T10:00:00+00:00"
}
```

### Statistiques du tableau de bord
```json
{
  "notes": {
    "total": 5,
    "enCours": 2,
    "terminees": 1,
    "aFaire": 2
  },
  "events": {
    "total": 5,
    "enCours": 2,
    "termines": 0,
    "aFaire": 3
  },
  "recentActivity": {
    "notes": [...],
    "events": [...]
  }
}
```

## 🔧 Configuration

### CORS
Le backend est configuré pour accepter les requêtes depuis :
- `http://localhost:3000`
- `http://127.0.0.1:3000`

### Validation
Toutes les entrées sont validées avec les contraintes suivantes :
- **Titre** : Obligatoire, max 255 caractères
- **Description** : Obligatoire
- **Date** : Obligatoire, format date
- **Heures** : Format HH:MM pour les événements
- **Catégorie** : 'personnel', 'travail', ou 'autre'
- **Tag** : 'en-cours', 'termine', ou 'a-faire'

## 🧪 Tests

```bash
# Lancer les tests
php bin/phpunit
```

## 📝 Exemples d'utilisation

### Créer une note
```bash
curl -X POST http://localhost:8000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouvelle note",
    "description": "Description de la note",
    "date": "2024-01-15",
    "category": "personnel",
    "tag": "a-faire"
  }'
```

### Créer un événement
```bash
curl -X POST http://localhost:8000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouvel événement",
    "description": "Description de l\'événement",
    "date": "2024-01-15",
    "startTime": "09:00",
    "endTime": "10:30",
    "category": "travail",
    "tag": "a-faire"
  }'
```

### Récupérer les statistiques
```bash
curl http://localhost:8000/api/dashboard/stats
```

## 🔗 Intégration avec Next.js

Pour intégrer ce backend avec votre frontend Next.js, utilisez les endpoints API dans vos composants React. Exemple :

```typescript
// Récupérer les notes
const response = await fetch('http://localhost:8000/api/notes');
const notes = await response.json();

// Créer une note
const response = await fetch('http://localhost:8000/api/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(noteData),
});
```

## 🚀 Déploiement

Pour déployer en production :
1. Configurer les variables d'environnement
2. Optimiser l'autoloader : `composer install --optimize-autoloader --no-dev`
3. Vider le cache : `php bin/console cache:clear --env=prod`
4. Configurer le serveur web (Apache/Nginx)

## 📞 Support

Pour toute question ou problème, consultez :
- [Documentation Symfony](https://symfony.com/doc/)
- [Documentation API Platform](https://api-platform.com/docs/) 