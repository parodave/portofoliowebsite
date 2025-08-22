import { execSync } from 'child_process';
import fs, { existsSync, mkdirSync, copyFileSync } from 'fs';
import fsPromises from 'fs/promises';
import { dirname, join } from 'path';
import fg from 'fast-glob';

// Step 1: remove existing install artifacts
console.log('🧹 Removing node_modules and package-lock.json...');
if (existsSync('node_modules')) fs.rmSync('node_modules', { recursive: true, force: true });
if (existsSync('package-lock.json')) fs.rmSync('package-lock.json', { force: true });

// Step 2: reinstall compatible Three.js related packages
console.log('📦 Installing compatible Three.js packages...');
const packages = [
  'three@0.154.0',
  '@react-three/fiber@8.18.0',
  '@react-three/drei@9.122.0',
  '@react-three/rapier@1.5.0',
  'react-globe.gl@2.34.0',
  '@types/three@0.162.0'
];
execSync(`npm install ${packages.join(' ')}`, { stdio: 'inherit' });

// Step 3: copy missing files under three/examples/jsm from local assets
console.log('📁 Copying missing JSM files...');
const filesToCopy = [
  {
    src: 'scripts/assets/three/shaders/AdditiveBlendingShader.js',
    dest: 'shaders/AdditiveBlendingShader.js'
  },
  {
    src: 'scripts/assets/three/nodes/Nodes.js',
    dest: 'nodes/Nodes.js'
  },
  {
    src: 'scripts/assets/three/renderers/webgpu/WebGPURenderer.js',
    dest: 'renderers/webgpu/WebGPURenderer.js'
  },
  {
    src: 'scripts/assets/three/nodes/tsl/tsl.js',
    dest: 'nodes/tsl/tsl.js'
  },
];

const baseDir = 'node_modules/three/examples/jsm';

function copyFile(src: string, dest: string) {
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  console.log(`✅ Copied ${dest}`);
}

async function copyMissingFiles() {
  for (const file of filesToCopy) {
    const destPath = join(baseDir, file.dest);
    if (existsSync(destPath)) {
      console.log(`ℹ️  Already exists: ${destPath}`);
      continue;
    }
    try {
      copyFile(file.src, destPath);
    } catch (err) {
      console.error(`❌ Error copying ${file.src}:`, err);
    }
  }
}

async function patchStdlib() {
  const stdlibPkgPath = join('node_modules', 'three-stdlib', 'package.json');
  if (existsSync(stdlibPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(stdlibPkgPath, 'utf8')) as Record<string, unknown>;
    pkg.exports = {
      ...(pkg.exports || {}),
      './nodes': '../three/examples/jsm/nodes/Nodes.js',
      './shaders/AdditiveBlendingShader': '../three/examples/jsm/shaders/AdditiveBlendingShader.js',
      './renderers/webgpu/WebGPURenderer': '../three/examples/jsm/renderers/webgpu/WebGPURenderer.js',
      './nodes/tsl/tsl': '../three/examples/jsm/nodes/tsl/tsl.js',
    };
    fs.writeFileSync(stdlibPkgPath, JSON.stringify(pkg, null, 2));
    console.log('🛠️  Patched three-stdlib exports.');
  } else {
    console.warn('⚠️  Could not find three-stdlib package.json.');
  }
}

async function replaceImports() {
  const files = await fg('src/**/*.{ts,tsx}', { absolute: true });
  let count = 0;
  for (const file of files) {
    const content = await fsPromises.readFile(file, 'utf8');
    if (content.includes('three/examples/jsm/')) {
      const updated = content.replace(/from ['"]three\/examples\/jsm\//g, "from 'three-stdlib/");
      if (updated !== content) {
        await fsPromises.writeFile(file, updated);
        console.log(`Updated ${file}`);
        count++;
      }
    }
  }
  console.log(`✅ Replaced imports in ${count} file${count === 1 ? '' : 's'}.`);
}

async function main() {
  await copyMissingFiles();
  await patchStdlib();
  await replaceImports();
  console.log('🚀 Fix completed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
