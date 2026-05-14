# overflow-ui

Overflow-ui is an open-to-the-public UI library developed by Synergy Codes:

https://www.npmjs.com/package/@synergycodes/overflow-ui

https://github.com/synergycodes/overflow-ui

## How can I work locally on both `workflow-builder` and `overflow-ui`?

Both repositories must be cloned next to each other in the same parent directory:

```
some-directory/
  overflow-ui/
  workflow-builder/
```

1. In the **overflow-ui** clone, build the dist files in the tokens package: `pnpm tokens prepare` (or the equivalent in that repo).
2. In **overflow-ui**, build the `overflow-ui` dist: `pnpm ui build` (or the equivalent in that repo).
3. In this repository, start the frontend with: `bun dev:local`

The `dev:local` script sets a `LOCAL_OVERFLOW_UI=true` flag that makes Vite resolve `@synergycodes/overflow-ui` directly from the local `../overflow-ui/packages/ui/dist/` instead of from npm. No manual changes to `package.json` or CSS imports are needed.
