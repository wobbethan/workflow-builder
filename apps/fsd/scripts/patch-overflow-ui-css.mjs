/**
 * Normalizes nested `var( var(` in overflow-ui CSS for Turbopack and writes a vendor copy.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(appRoot, '../..');
const vendorDir = join(appRoot, 'vendor');
const vendorPath = join(vendorDir, 'overflow-ui-index.css');

const OVERFLOW_UI_CSS = /[/\\]@synergycodes[/\\]overflow-ui[/\\]dist[/\\]index\.css$/;

function patchContent(content) {
  return content.replaceAll(/var\(\s*var\((--[^)]+)\)\s*\)/g, 'var($1)');
}

function patchFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const patched = patchContent(content);
  writeFileSync(filePath, patched, 'utf8');
  if (content !== patched) {
    console.log(`Patched ${filePath}`);
  }
  return patched;
}

function* walkFiles(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.cache' || entry.name === '.git') {
        continue;
      }
      yield* walkFiles(fullPath);
    } else if (OVERFLOW_UI_CSS.test(fullPath.replace(/\\/g, '/'))) {
      yield fullPath;
    }
  }
}

let vendorWritten = false;

for (const nodeModulesRoot of [
  join(appRoot, 'node_modules'),
  join(repoRoot, 'node_modules'),
]) {
  for (const cssPath of walkFiles(nodeModulesRoot)) {
    const patched = patchFile(cssPath);
    if (!vendorWritten) {
      mkdirSync(vendorDir, { recursive: true });
      writeFileSync(vendorPath, patched, 'utf8');
      vendorWritten = true;
    }
  }
}

if (!vendorWritten) {
  console.warn('No @synergycodes/overflow-ui/dist/index.css found to patch');
  process.exit(1);
}
