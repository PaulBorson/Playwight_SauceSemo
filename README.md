# project01

Playwright end-to-end tests for the Sauce Demo sample site.

## What this repo contains

- Playwright tests under `tests/`
- Page objects under `pages/`
- Playwright configuration `playwright.config.ts`
- TypeScript configuration `tsconfig.json`
- ESLint + Prettier config files

## Setup

Prerequisites: Node.js (16+), npm, and optionally Git/GitHub CLI `gh`.

Install dependencies:

```bash
cd project01
npm install
```

## Run tests

Run the full Playwright test suite:

```bash
npm test
```

Show the HTML report:

```bash
npm run show-report
```

Run a single test (headed + tracing for debugging):

```bash
npx playwright test tests/e2e.spec.ts -g "Complete Flow E2E" --headed --trace=on
```

## Lint & Format

```bash
npm run lint
npm run lint:fix
npm run format
```

## Notes

- I fixed TypeScript and import issues, added `tsconfig.json`, and configured ESLint/Prettier.
- I fixed page object selectors (LoginPage, Inventory) to stabilize tests.

## Publish to GitHub

To push this local repo to GitHub, either:

1. Create an empty repository on GitHub and then run:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

2. Or, if you have `gh` installed and authenticated, run:

```bash
gh repo create <repo-name> --public --source=. --remote=origin --push
```

If you want, I can create the remote and push for you — provide the repo name and whether it should be public or private, or confirm you have `gh` authenticated and I will run the `gh` command.
