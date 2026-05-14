/* eslint-disable unicorn/prefer-top-level-await */
import fs, { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticDirectory = path.join(__dirname, '../../../../dist/apps/frontend');
const assetsDirectory = path.join(staticDirectory, '/assets');

/** Optional post-build step for legacy avoid-nodes worker + wasm (plugin removed from this app). */
async function fixAvoidNodesWorker() {
  try {
    const indexFile = path.join(staticDirectory, 'index.html');

    if (!existsSync(indexFile)) {
      console.log(`Build output not found: ${indexFile}`);
      return;
    }

    if (!existsSync(assetsDirectory)) {
      console.log(`Assets directory not found: ${assetsDirectory}`);
      return;
    }

    const files = fs.readdirSync(assetsDirectory);
    let workerFile: string | undefined;

    for (const file of files) {
      if (file.startsWith('worker')) {
        const filePath = path.join(assetsDirectory, file);
        const content = readFileSync(filePath, 'utf8');

        if (content.includes('avoidLib')) {
          workerFile = file;
          break;
        }
      }
    }

    if (!workerFile) {
      console.log('No avoid-nodes worker in assets; skipping worker-an-fix.');
      return;
    }

    const wasmFile = path.join(__dirname, '../../src/app/plugins/avoid-nodes-edges/libs/web-workers/libavoid.wasm');

    if (!existsSync(wasmFile)) {
      console.log(`libavoid.wasm source not found: ${wasmFile}; skipping worker-an-fix.`);
      return;
    }

    console.log('Avoid-nodes worker + wasm found; applying worker-an-fix.');

    const sourcePath = path.join(assetsDirectory, workerFile);

    fs.copyFileSync(sourcePath, path.join(assetsDirectory, 'aneWorker.js'));
    fs.copyFileSync(wasmFile, path.join(assetsDirectory, 'libavoid.wasm'));

    let template = readFileSync(indexFile, 'utf8');

    if (!template.includes('worker-an-fix')) {
      template = template.replace(
        '</head>',
        `<script id="worker-an-fix">window.customAvoidRoutesRouterUrl = location.origin + '/assets/aneWorker.js';</script></head>`,
      );

      writeFileSync(indexFile, template, 'utf8');
    }
  } catch (error) {
    console.error('❌ Error fixing worker file:', error);
  }
}

fixAvoidNodesWorker();
