// scripts/fix-three-render-objects.ts

import fs from 'fs';
import path from 'path';

const root = process.cwd();
const filePath = path.join(
  root,
  'node_modules/globe.gl/node_modules/three-render-objects/dist/three-render-objects.mjs'
);

if (!fs.existsSync(filePath)) {
  console.error('❌ Fichier introuvable :', filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');

// ✅ Patch : ajout d’un commentaire spécial pour désactiver l’analyse Vite
const patched = `/* @vite-ignore */\n${content}`;

fs.writeFileSync(filePath, patched, 'utf-8');
console.log('✅ Patch appliqué à three-render-objects.mjs');
