# Workflow Builder portable bundle

Copy this directory (or the paths below) into a Next.js App Router project to run the workflow builder as a self-contained kit.

## Bundle contents

| Path | Required | Purpose |
|------|----------|---------|
| `src/` | Yes | Feature-sliced workflow builder UI and logic |
| `app/` | Yes | Next.js entry (`layout`, `page`, `globals.css`, `fake-api` route) |
| `package.json` | Yes | Dependencies (use `package.portable.json` when outside the monorepo) |
| `tsconfig.json` | Yes | TypeScript paths for `@/` aliases (use `tsconfig.portable.json` standalone) |
| `next.config.ts` | Yes | Transpile packages + overflow-ui CSS patch alias |
| `postcss.config.mjs` | Yes | Tailwind v4 |
| `scripts/patch-overflow-ui-css.mjs` | Yes | Patches overflow-ui CSS for Turbopack (runs on `postinstall`) |
| `vendor/overflow-ui-index.css` | Generated | Created by patch script; commit or regenerate after install |
| `packages/icons/` | Yes | Copy from monorepo `apps/icons` → `packages/icons` at kit root |

## Copy into a host project

1. Copy the bundle paths into your app root (e.g. `workflow-builder/`).
2. Rename `package.portable.json` → `package.json` (or merge dependencies into the host `package.json`).
3. Rename `tsconfig.portable.json` → `tsconfig.json`, or merge `compilerOptions.paths` into the host tsconfig.
4. Copy `apps/icons` from this monorepo to `packages/icons` and set `"@workflow-builder/icons": "file:./packages/icons"`.
5. Run `npm install` / `bun install` in the icons package (`cd packages/icons && npm run build`).
6. Run `postinstall` (patch overflow-ui CSS) at the kit root.
7. Mount the builder: import `WorkflowBuilderPage` from `@/page/workflow-builder` in a client page (see `app/page.tsx`).

## Integration API

Default persistence uses `GET` / `POST` on `/fake-api` (see `app/fake-api/route.ts`). Payload shape: `IntegrationDataFormat` in `src/features/integration/types.ts`.

Override the URL in the host:

```env
NEXT_PUBLIC_WB_API_URL=https://your-api.example.com/diagrams/1
```

Client code reads this in `src/features/integration/config.ts`.

## Host requirements

- Next.js 16+ (App Router)
- React 19
- Tailwind CSS v4 via PostCSS
- `@synergycodes/overflow-ui` tokens imported in `app/globals.css`

Optional: load **Poppins** (used in `globals.css`) via `next/font` in `app/layout.tsx`.

## Monorepo development

Inside this repo, use the root workspace and `apps/fsd/package.json` with `workspace:*` for `@workflow-builder/icons`. Use `package.portable.json` only when copying the kit elsewhere.
