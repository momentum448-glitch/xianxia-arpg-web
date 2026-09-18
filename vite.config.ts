import { defineConfig } from 'vite';

const runtime = globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
};
const buildId = runtime.process?.env?.GITHUB_SHA?.slice(0, 7) ?? `local-${Date.now().toString(36).slice(-5)}`;

export default defineConfig({
  base: '/xianxia-arpg-web/',
  define: {
    __BUILD_ID__: JSON.stringify(buildId),
  },
  build: {
    target: 'es2022',
  },
});
