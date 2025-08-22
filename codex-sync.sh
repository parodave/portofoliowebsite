#!/bin/bash

# 🚀 Script de synchronisation Codex > GitHub (branche main)

# Étape 1 : Aller à la racine du projet
cd "$(dirname "$0")"

echo "🔄 Sauvegarde des modifications en cours..."

# Étape 2 : Ajouter tous les fichiers modifiés
git add .

# Étape 3 : Demander un message de commit
echo "📝 Entrez votre message de commit :"
read commitMsg

# Étape 4 : Commit avec le message
git commit -m "$commitMsg"

# Étape 5 : Se placer sur la branche main
git checkout main

# Étape 6 : Récupérer les dernières modifications
git pull origin main

# Étape 7 : Fusionner la branche de travail (codex-base)
git merge codex-base

# Étape 8 : Push vers GitHub (branche main)
git push origin main

echo "✅ Modifications synchronisées sur GitHub (branche main) avec message : $commitMsg"
