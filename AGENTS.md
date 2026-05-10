# AGENTS.md

## Commands
- Use Node `>=22.12.0`; this workspace currently has Node 24.
- Canonical install path is `pnpm install` from `README.md` and tracked `pnpm-lock.yaml`; `package-lock.json` is currently untracked, so do not update or rely on it unless the repo intentionally switches to npm.
- Main scripts: `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm generate-types`.
- There are no lint, test, or typecheck scripts in `package.json`; use `pnpm build` as the primary verification step.
- If `pnpm` is unavailable in the current environment, `npm run build` has been verified to work here, but prefer pnpm for dependency changes.

## Runtime And Deploy
- `astro.config.mjs` is the executable source of truth: Astro output is `server` with `@astrojs/cloudflare`, not a static-only build.
- Cloudflare Worker deploy config is `wrangler.jsonc`; it points `main` at `@astrojs/cloudflare/entrypoints/server` and serves assets from `dist/`.
- Supabase credentials are read via `cloudflare:workers` `env` in `src/lib/supabase.ts`; do not replace this with `import.meta.env` unless the runtime target changes.
- Local `.env` files are ignored. Deployed vars currently live under `vars` in `wrangler.jsonc`.
- Run `pnpm generate-types` after changing Wrangler bindings or env vars so `worker-configuration.d.ts` matches Cloudflare bindings.

## App Structure
- Routes live in `src/pages`: `/`, `/productos`, `/productos/[id]`, `/contacto`, `/api/consulta`, and `/sitemap.xml`.
- `src/layouts/Base.astro` owns global CSS import, fonts, SEO meta, JSON-LD defaults, and Astro `ClientRouter`; check it before adding page-level SEO or navigation behavior.
- Product and sitemap pages query Supabase at render/request time and only show products with `stock > 0` in listing-style views.
- `src/pages/api/consulta.ts` is the only write path; it inserts into Supabase table `consultas` and expects `nombre`, `email`, `mensaje`, optional `telefono`, optional `producto_id`.

## Styling
- Tailwind is v4 through the Vite plugin in `astro.config.mjs`; there is no `tailwind.config.*`.
- Design tokens are in `src/styles/global.css` under `@theme`; primary brand color is `--color-primary: #8b4557`.
- Fonts are loaded in `Base.astro`: Inter for body, Libre Caslon Text for headings.

## Gotchas
- `README.md` says Astro hybrid, but current config is Cloudflare `output: 'server'`; trust config over prose.
- `dist/`, `.astro/`, `.wrangler/`, and `.env*` are ignored build/runtime artifacts; do not add them to commits.
