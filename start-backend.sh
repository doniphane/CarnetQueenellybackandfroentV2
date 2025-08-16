#!/bin/bash

echo "🚀 Démarrage du backend Symfony..."

# Aller dans le dossier backend
cd backend

# Vérifier si PHP est installé
if ! command -v php &> /dev/null; then
    echo "❌ PHP n'est pas installé. Veuillez installer PHP 8.1+"
    exit 1
fi

# Vérifier si Composer est installé
if ! command -v composer &> /dev/null; then
    echo "❌ Composer n'est pas installé. Veuillez installer Composer"
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "vendor" ]; then
    echo "📦 Installation des dépendances..."
    composer install
fi

# Vérifier si la base de données existe
echo "🗄️ Vérification de la base de données..."
php bin/console doctrine:database:create --if-not-exists

# Exécuter les migrations
echo "🔄 Exécution des migrations..."
php bin/console doctrine:migrations:migrate --no-interaction

# Charger les données de test
echo "📝 Chargement des données de test..."
php bin/console doctrine:fixtures:load --no-interaction

# Démarrer le serveur
echo "🌐 Démarrage du serveur sur http://localhost:8000"
echo "📚 API Platform UI: http://localhost:8000/api"
echo "🔗 API Endpoints: http://localhost:8000/api/notes, http://localhost:8000/api/events"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

php -S localhost:8000 -t public/ 