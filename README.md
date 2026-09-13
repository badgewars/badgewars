# Badge Wars

A weekly, live-text social deduction game for tripleS fans. Twenty-four member identities form the cast; the audience follows the accusations, locks in predictions, and earns achievement badges.

The current concept combines paid live participation, random cast selection, NFT badge editions, and a public leaderboard with past results, highlights, and recaps. The rules should support repeat play without a new authored season every week.

**Status: design, build planning, and the first app scaffold.** The [interactive courtroom study](design/courtroom.html) demonstrates layout and phase controls using local fixtures. `apps/web` is a fixture-driven shell of the same design, not yet a playable multiplayer game. No production application, smart contracts, final artwork collection, or deployment exists yet.

## Project documents

| Document | Purpose |
| --- | --- |
| [Product](docs/PRODUCT.md) | Goals, current decisions, experience, and open questions |
| [UI design](docs/UI.md) | Courtroom, cards, chat permissions, mobile behavior, and art scope |
| [Build plan](docs/BUILD_PLAN.md) | Implementation order, dependencies, deliverables, and acceptance checks |
| [Gameplay](docs/GAMEPLAY.md) | Proposed match flow, atomic actions, roles, and recovery rules |
| [Badges](docs/BADGES.md) | Achievement catalogue, prediction rules, and NFT editions |
| [Architecture](docs/ARCHITECTURE.md) | State, privacy, replay, chain boundaries, and implementation sequence |
| [Research](docs/RESEARCH.md) | Dated chain and fee research with sources and limitations |
| [Agent instructions](AGENTS.md) | Shared working rules for coding agents |

## Development

The layout study is self-contained HTML with no dependencies or network calls. Open `design/courtroom.html`, or serve it with `python3 -m http.server 8080 --bind 127.0.0.1 --directory design`. This command does not open a browser. Its phase/perspective selectors are reviewer controls, not product features.

## Development

The app lives in `apps/web` (Next.js 15, React 19, Tailwind v4, shadcn/ui, framer-motion; bun workspaces).

```
bun install
bun run dev     # apps/web on localhost:3000 (dev-only fixture bar included)
bun run build   # production build; fixture controls are excluded
```

Build prerequisite on this machine: run builds with an **arm64 node** (`~/.nvm/versions/node/v24.14.0/bin/node` prepended to PATH). The default `~/.local/bin/node` is x86_64 under Rosetta and cannot load the arm64 `lightningcss` native binary bun installs. The repo pins bun's hoisted linker in `bunfig.toml` for the same reason.

Documentation changes can be checked with `git diff --check` and a review of relative links.

## Deploy

Not hosted yet. This project deploys only from a **buxor-owned** hosting account with buxor-only credentials. Once a buxor Vercel (or Render) token exists in `~/.tokens`, `apps/web` deploys with a direct upload or service create; no GitHub app or external collaborator is involved.

Badge Wars is a working project name. No official tripleS, MODHAUS, or Cosmo partnership or asset license is established by this repository.
