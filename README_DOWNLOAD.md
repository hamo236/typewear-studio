# Typewear — downloadable website package

This archive contains the complete Typewear source project and a prebuilt static website in `dist/public/`. It is a frontend prototype: product names/prices are sample data; there is no real inventory, customer account, server-side order handling, payment processing, or contact-message delivery.

## Run locally

Requirements: Node.js 20 or newer and pnpm 9 or newer.

```bash
pnpm install --frozen-lockfile
pnpm dev:static
```

Open `http://localhost:3000`. The app is bilingual (Arabic/English) and includes responsive pages, local design drafts, sample bag state, and locally rendered SVG garment mockups.

## Build and host

```bash
pnpm install --frozen-lockfile
pnpm build:static
```

Upload the contents of `dist/public/` to a static host. Configure the host to serve `index.html` for application routes such as `/products`, `/editor`, `/cart`, and `/about`. A prebuilt copy is included, but rebuilding is recommended after source edits.

## Project contents

- `client/src/` — React pages, editor components, translations and styles.
- `client/public/` — route manifest and locally bundled Cairo/DM Sans fonts with their SIL Open Font Licenses.
- `dist/public/` — prebuilt static website.
- `package.json`, `pnpm-lock.yaml`, Vite and TypeScript configuration — reproducible source/build setup.
- `plan.md`, `TODO.md`, `LIBRARIES.md`, `NEXT_PHASE.md` — design, remaining work, dependency licensing and future-phase notes.

Use `pnpm check` for TypeScript validation. The application does not require environment variables for the static prototype.
