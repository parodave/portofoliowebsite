import { execSync } from 'child_process'
import fs from 'fs'

// 1. Supprimer node_modules et package-lock.json
console.log('🧹 Suppression de node_modules et du lockfile...')
if (fs.existsSync('node_modules')) fs.rmSync('node_modules', { recursive: true, force: true })
if (fs.existsSync('package-lock.json')) fs.rmSync('package-lock.json', { force: true })

// 2. Réinstaller les versions compatibles de three et react-globe.gl
console.log('📦 Installation de three@0.154.0 et react-globe.gl compatible...')
execSync('npm install three@0.154.0 react-globe.gl', { stdio: 'inherit' })

// 3. Message de fin
console.log('✅ Correctif appliqué. Relancez le projet avec npm run dev.')
