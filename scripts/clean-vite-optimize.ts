import { rmSync } from 'fs';
import path from 'path';

const optimizeDir = path.resolve('node_modules/.vite');
rmSync(optimizeDir, { recursive: true, force: true });
console.log(`🧹 Removed ${optimizeDir}`);

