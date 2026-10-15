# npm workspaces

Install and run from the repo root.

## Commands

- `npm install` installs every workspace, then `postinstall` builds platforms, identity, database-client, iam, embed, and app
- `npm run dev` starts IAM, the Next.js app (`next dev`), and the hn-signer compose file
- App-only: `npm run dev -w @gitcoin/passport-app`
- One package script: `npm run <script> -w @gitcoin/<package>`

## Layout

- Root `package.json` `workspaces` is an array. npm does not read Yarn's `{ "packages": [] }` form
- React, Next, and Tailwind live in `app/package.json`. The root install links that package
- Version pins are root `overrides`. npm ignores `resolutions`
- `.npmrc` sets `legacy-peer-deps=true` so the Yarn-era peer graph still installs
- `infra/` and `infra/scripts/verifier_sweep/` are outside the workspace and keep their own `package-lock.json`

## Tailwind

PostCSS loads `app/tailwind.config.js`. `app/tailwind.config.d.ts` types that file for `useBreakpoint`.
