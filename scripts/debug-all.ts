import { execSync } from 'child_process';
import fs from 'fs';
import { join } from 'path';

console.log('🧹 Removing node_modules and package-lock.json...');
if (fs.existsSync('node_modules')) fs.rmSync('node_modules', { recursive: true, force: true });
if (fs.existsSync('package-lock.json')) fs.rmSync('package-lock.json', { force: true });

console.log('📦 Reinstalling packages with legacy peer deps...');
execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

console.log('🛠️  Patching three-stdlib exports...');
const pkgPath = join('node_modules', 'three-stdlib', 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as Record<string, unknown>;
  pkg.exports = {
    './package.json': './package.json',
    './*': './*',
    ...pkg.exports,
  };
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log('✅ three-stdlib exports patched.');
} else {
  console.warn('⚠️  three-stdlib package.json not found.');
}

console.log('🚀 Debug setup complete.');
