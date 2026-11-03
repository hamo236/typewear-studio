# Deployment runbook

## Live site

The live site is [https://hamo236.github.io/typewear-studio/](https://hamo236.github.io/typewear-studio/).

## How deployment works

- **Deploy branch:** `main`
- **Publishing mechanism:** GitHub Actions workflow `.github/workflows/deploy-pages.yml`, named `Deploy Typewear to GitHub Pages`.
- **Build command:** `pnpm build:static` on Node 22 with pnpm 10.18.0.
- **Published artifact:** the workflow uploads `dist/public` after copying `dist/public/index.html` to `dist/public/404.html` for SPA fallback. GitHub Pages is configured with workflow publishing; the Pages API reports source branch `main` and path `/`.
- **How a change reaches the site:** commit the change on `main` and push it to `origin/main`. The push triggers the workflow, which installs dependencies, builds the static frontend, uploads the Pages artifact, and deploys it.
- **Typical delay:** recent successful runs took approximately 87–90 seconds from workflow creation to completion. Allow a few additional seconds for Pages edge propagation.

## Cheapest deployment check

After pushing, run this single command and confirm the newest `main` run has the pushed commit, `status` is `completed`, and `conclusion` is `success`:

```bash
gh run list --workflow deploy-pages.yml --branch main --limit 1 --json status,conclusion,headSha,headBranch,updatedAt,url
```

This check confirms the GitHub Pages workflow completed successfully without browsing the live site or taking screenshots.

## If deployment fails

Read the failed run URL and its logs with `gh run view <run-id> --log-failed`. Fix the actual cause, commit the fix on `main`, push again, and repeat the cheap check. If the failure is not fixable in the current task, mark the task `[!]` with the exact reason and record `pushed, deployment not confirmed` in both the task notes and `docs/HANDOFF.md`.

## Scope and safety

The repository is public. Never put secrets, tokens, personal data, or deployment credentials in tracked files. GitHub Pages serves the static frontend only; it does not provide live inventory, accounts, remote persistence, payment checkout, order processing, or contact-message delivery.
