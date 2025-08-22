import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';

function getIgnorePatterns(): string[] {
  const gitignorePath = path.resolve(__dirname, '..', '.gitignore');
  let content = '';
  try {
    content = fs.readFileSync(gitignorePath, 'utf8');
  } catch {
    return [];
  }

  return content
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
}

function isBinary(file: string): boolean {
  const buffer = fs.readFileSync(file);
  const len = Math.min(buffer.length, 1000);

  for (let i = 0; i < len; i++) {
    if (buffer[i] === 0) {
      return true;
    }
  }

  let nonText = 0;
  for (let i = 0; i < len; i++) {
    const byte = buffer[i];
    if (byte < 9 || (byte > 13 && byte < 32) || byte > 126) {
      nonText++;
    }
  }

  return nonText / len > 0.3;
}

async function main() {
  const ignore = getIgnorePatterns();
  const entries = await fg(['public/**/*', 'assets/**/*'], {
    ignore,
    dot: true,
    onlyFiles: true,
  });

  let count = 0;
  for (const file of entries) {
    if (isBinary(file)) {
      console.log(`Deleting ${file}`);
      fs.unlinkSync(file);
      count++;
    }
  }

  console.log(`Removed ${count} binary file${count === 1 ? '' : 's'}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
