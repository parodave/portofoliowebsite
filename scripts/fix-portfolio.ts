import { execSync } from 'child_process';
import fs from 'fs';

function safeExec(cmd: string, label = '') {
  try {
    console.log(`🔧 ${label || cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.warn(`⚠️  Skipped: ${cmd}`);
    console.error(err);
  }
}

// Step 1: Wipe old deps
if (fs.existsSync('node_modules')) fs.rmSync('node_modules', { recursive: true });
if (fs.existsSync('package-lock.json')) fs.rmSync('package-lock.json');

// Step 2: Install fresh
safeExec('npm install --legacy-peer-deps', 'Installing dependencies');

// Step 3: Run all patches
const patches = [
  'patch:three-stdlib',
  'patch:frame-ticker',
  'patch:react-globe',
  'patch:vite-globe',
  'fix:three',
  'fix:globe',
  'fix:frame-ticker',
  'fix:tsl',
  'fix:render-objects',
  'fix:three-globe-imports',
  'clean:optimizeDeps'
];

for (const script of patches) {
  safeExec(`npm run ${script}`, script);
}

// Step 4: Launch dev server
console.log('🚀 Lancement du serveur dev...');
safeExec('npm run dev', 'npm run dev');
