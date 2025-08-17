#!/bin/bash

echo "🚀 Démarrage du serveur Symfony..."

# Aller dans le dossier backend
cd backend

# Vérifier si les clés JWT existent
if [ ! -f "config/jwt/private.pem" ] || [ ! -f "config/jwt/public.pem" ]; then
    echo "🔑 Génération des clés JWT..."
    mkdir -p config/jwt
    openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096 -pass pass:your_passphrase
    openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout -passin pass:your_passphrase
    echo "✅ Clés JWT générées"
fi

# Installer les dépendances si nécessaire
if [ ! -d "vendor" ]; then
    echo "📦 Installation des dépendances Composer..."
    composer install
fi

# Vider le cache
echo "🧹 Nettoyage du cache..."
php bin/console cache:clear

# Mettre à jour la base de données
echo "🗄️ Mise à jour de la base de données..."
php bin/console doctrine:migrations:migrate --no-interaction

# Démarrer le serveur
echo "🌐 Démarrage du serveur Symfony sur http://localhost:8000..."
symfony server:start --port=8000 --daemon

echo "✅ Serveur Symfony démarré !"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8000"
echo "📚 API: http://localhost:8000/api" 