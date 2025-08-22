import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const distPath = resolve(__dirname, '..', 'dist');
if (!existsSync(distPath)) {
  mkdirSync(distPath, { recursive: true });
}
