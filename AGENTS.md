# AGENTS.md

This file is the single source of truth for every agent working in this repository. Read it completely before acting.

## 1. Start of every session

- Run `git pull --rebase`.
- Read `AGENTS.md`, `docs/PROJECT_BRIEF.md`, `docs/DESIGN_SYSTEM.md`, the top entries of `docs/HANDOFF.md`, and `docs/TASKS.md`.
- Find the first task in `docs/TASKS.md` that is not `[x]` and whose dependencies are all `[x]`.
- If a task is `[~]` (in progress by another agent that probably ran out of budget), read its notes and the recent git log/diff, then continue it. Do not start a new task before it is `[x]`.

## 2. Task statuses

- `[ ]` todo
- `[~]` in progress: add `(agent name, UTC date)` and short notes
- `[x]` done: add `(agent name, UTC date, how it was verified, commit hash)`
- `[!]` blocked: add the exact reason
- Never delete a task or renumber tasks. New tasks are added at the end with the next ID. Never edit another task's acceptance criteria to make it easier.

## 3. Workflow per task

1. **Claim:** change `[ ]` to `[~]`, add the agent name, UTC date, and short notes; commit and push so other agents see the claim.
2. **Do the work:** follow `docs/DESIGN_SYSTEM.md` and `docs/PROJECT_BRIEF.md`. Reuse existing components and tokens; do not create one-off styles.
3. **Verify before marking done.**
4. **Mark done:** change the task to `[x]` with evidence in the same commit as the work, or in the commit immediately after it; push.
5. Add a short entry to `docs/HANDOFF.md` if anything non-obvious was decided.
6. Move to the next task and continue until the budget is nearly finished.

## 4. Verification (mandatory)

- Install and build must pass.
- Run the site and actually use the feature: click it, reload, and test empty/error cases.
- For UI tasks, check 360px, 768px, 1440px, light mode, dark mode, and RTL.
- If a browser cannot be run, say so: leave the task as `[~]` with the note `needs visual check`. Never mark `[x]` on assumption. Never claim something works without testing it.
- If something is only partly working, say so in the task notes and in `docs/HANDOFF.md`.

## 5. When token or budget is running low

- Stop starting new things.
- Commit what works, using a `wip:` prefix if incomplete.
- Keep the task `[~]` with exact notes: what is done, what is left, files touched, and known bugs.
- Update `docs/HANDOFF.md`.
- Push. Never end a session with unpushed or unrecorded work.

## 6. Git rules

- Run `git pull --rebase` before starting and before pushing.
- Make small, frequent commits. Never force-push.
- Never commit secrets, tokens, or personal data.
- Commit messages must be short, lowercase, and written like a normal developer, for example `add cart drawer` or `fix landscape photos cropping`.
- Never add AI co-author lines, `generated with` lines, or similar wording to commits or files.

## 7. Scope and honesty

- Do only what the current task asks. Do not refactor unrelated code.
- Do not redo `[x]` tasks unless their verification fails; if it fails, reopen it as `[~]` with the reason.
- Never fake a feature. Placeholder things must be visibly marked and listed in `docs/HANDOFF.md`.
- Prefer free, maintained, permissively licensed (MIT/Apache-2.0) open-source libraries over writing complex things from scratch. Check license and maintenance first. Record every dependency added (name, link, license) in `docs/HANDOFF.md`.
- Ask the owner only if truly blocked. Otherwise make the best reasonable assumption, record it in `docs/HANDOFF.md`, and continue.
- Never look AI-made: follow `docs/QUALITY_CHECKLIST.md` for every piece of UI text, design, and code.
- One agent at a time is recommended. If two agents might work together, each must claim a different task first and pull before every push.

## Project facts

These facts were audited from a clean clone of `hamo236/typewear-studio` on 2026-11-03. The setup session did not change existing site code, styles, or assets.

### Stack and runtime

- Application name/package: `typewear`, version `1.0.0`, MIT license.
- Frontend: React 19.2.1, TypeScript 5.9.3, Vite 7.3.7, Tailwind CSS 4.1.14, Wouter 3.7.1, Lucide React 0.453.0.
- Server scaffold: Express 4.21.2, tRPC 11.6.0, Drizzle ORM 0.44.6, MySQL driver, and server code under `server/`.
- Package manager: pnpm 10.18.0, declared in `package.json` and `packageManager`.
- Node version used by GitHub Actions: Node 22.
- TypeScript is strict, no-emit, with Vite/bundler module resolution. Path aliases include `@/*`, `@shared/*`, and Vite aliases for `@assets`.
- The current repository contains an existing customization-studio prototype and shared UI components. Existing project planning describes home, products, editor, cart, about, 404, and hidden design-system routes.

### Commands

- Install: `pnpm install --frozen-lockfile`.
- Development server: `pnpm dev` (Express/Vite server; honors `PORT`, default 3000).
- Static development server: `pnpm dev:static` (Vite on `0.0.0.0`, port `${PORT:-3000}`, strict port).
- Typecheck: `pnpm check`.
- Tests: `pnpm test` (`vitest run`).
- Full build: `pnpm build` (Vite frontend plus bundled server output).
- Static build: `pnpm build:static` (Vite frontend to `dist/public`).
- Production server: `pnpm start` after `pnpm build`.
- Database migration commands exist as `pnpm db:migrate` and `pnpm db:push`; do not use them for static-store work without a task requiring database changes.

The setup session verified `pnpm install --frozen-lockfile`, `pnpm check`, and `pnpm build:static` successfully. A browser interaction run was not performed during setup.

### Deployment

- GitHub Actions workflow: `.github/workflows/deploy-pages.yml`.
- On pushes to `main` or manual dispatch, it installs pnpm 10.18.0 on Node 22, runs `pnpm build:static`, copies `dist/public/index.html` to `dist/public/404.html` for SPA fallback, and deploys the artifact with GitHub Pages.
- Vite uses `/typewear-studio/` as its base when `GITHUB_ACTIONS=true`; local development and other root hosts use `/`.
- The repository's `DEPLOYMENT.md` currently describes a static frontend prototype with browser-local sample browsing, garment customization, and cart state; it explicitly says there is no live inventory, account service, backend API, remote persistence, payment checkout, order processing, or contact-message delivery.
- Do not deploy or publish from a task unless that task and the owner explicitly authorize it. The setup session was authorized to commit and push the requested workflow files.

### Folder map

- `client/index.html`: frontend HTML entry and static metadata.
- `client/public/`: public static assets and `manus-routes.json`.
- `client/src/App.tsx`: application entry and route composition.
- `client/src/pages/`: Home, Products, Editor, Cart, About, DesignSystem, and NotFound pages.
- `client/src/components/`: app shell, garment/editor components, product cards, dialogs, and reusable UI primitives under `client/src/components/ui/`.
- `client/src/contexts/`: theme context.
- `client/src/hooks/`: reusable hooks.
- `client/src/lib/`: catalog, editor utilities, i18n, persistence/context, types, tRPC, and utility helpers.
- `server/`: Express/tRPC/server platform helpers, storage, database, and tests.
- `shared/`: shared constants, types, and errors.
- `drizzle/`: checked-in database schema migration artifacts.
- `.github/workflows/`: GitHub Pages deployment workflow.
- `docs/`: this repository's multi-agent brief, design system, task list, handoff log, and quality checklist.
- `dist/`: generated build output; do not edit by hand.

### Current compatibility notes

- Existing repo planning is for a customization studio, while the owner brief in `docs/PROJECT_BRIEF.md` defines the next clothing-store direction: product display, local admin/catalog management, image slots, cart, and WhatsApp ordering without payments.
- The existing palette/typography plan uses charcoal, coral, Cairo, and DM Sans. The owner brief requests a warm off-white, charcoal, single lime accent, and an Arabic-capable display/text pairing. Future design-system tasks must resolve this documented direction deliberately rather than silently mixing both systems.
- GitHub Pages is static. The owner requirements' IndexedDB/local admin editing and ZIP export are compatible with the static host; a real shared backend is explicitly out of scope.
- The existing `package.json` includes `lucide-react`, so the requested single icon set can reuse it without adding a dependency.
