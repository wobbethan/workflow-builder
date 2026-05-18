import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = path.dirname(fileURLToPath(import.meta.url));
const overflowUiCssPatch = path.join(appDir, 'vendor', 'overflow-ui-index.css');

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@synergycodes/overflow-ui/dist/index.css': overflowUiCssPatch,
    },
  },
  transpilePackages: [
    '@jsonforms/core',
    '@jsonforms/react',
    '@synergycodes/overflow-ui',
    '@workflow-builder/icons',
    '@xyflow/react',
  ],
};

export default nextConfig;
