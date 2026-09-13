# Badge Wars agent instructions

This is the canonical project guidance for Codex, Claude Code, and other agents. `CLAUDE.md` imports this file; keep the rules here instead of maintaining two copies.

## Start here

Read [README.md](README.md) and [docs/PRODUCT.md](docs/PRODUCT.md) before working. Read the relevant gameplay, badge, or architecture document for the task. Product decisions belong in those documents, not only in a conversation.

The repository contains design documentation and a standalone layout study in `design/courtroom.html`. The study uses local fixtures; it is not a game engine, permission system, or multiplayer application. No production contracts, application build command, or deployment exist yet. Do not report proposals as implemented behavior.

## Reasoning and scope

- Have an opinion, grounded in first principles and explicit criteria. Optimize for player enjoyment, sustainable revenue, fairness, and low recurring operating effort.
- Do not mirror the latest preference without evaluating it. Change a recommendation when evidence or requirements change; distinguish preference from evidence.
- Preserve the difference between accepted direction, proposed rules, open questions, and verified implementation. An assistant suggestion is not automatically an approved requirement.
- When asked to discuss, discuss and inspect. When asked to implement, finish the authorized work and its relevant checks. Resolve routine implementation choices without repeatedly asking for permission.
- Keep changes focused. Do not introduce a framework, infrastructure, paid service, or ongoing content pipeline merely because it is conventional.
- Write plainly. Explain the outcome, reasoning, verification, and material limitations. Keep blockchain implementation details out of player flows unless they help the player make a decision.

## Product boundaries

- The launch concept is one weekly, synchronous, live-text Mafia event with all 24 tripleS member identities represented. See PRODUCT for the status of specific choices.
- Use Mafia, Citizens, Detective, and Lawyer consistently. The current design has one accused member, Arrest/Acquit verdicts, and a non-voting gallery. Every elimination is an arrest — by day on a verdict, by night through a Mafia frame; arrested members lose Match Chat writing and the Mafia channel for good, and may talk only in the removed-only gallery channel. The earlier two-nominee trial, jury ballot, Doctor/protect language, and Remove/Spare verdicts are superseded.
- Keep the courtroom in the center and Match Chat on the right. Spectators also get Audience Chat; cast accounts cannot access it during play. Portraits stay present, with large spotlights for trials and selected members.
- Live access is paid for both cast and audience. The leaderboard houses post-event highlights, recaps, and public chat/action replay. Private faction chat stays excluded by default.
- There is no wagering, prize pool, or staking of ETH, COMO, or Objekts. A ticket buys event participation; a cast seat is not guaranteed.
- Audience deduction must be enjoyable independently of being selected for the cast. Paid entries and blockchain randomness do not establish one-person eligibility.
- Build reusable rules. Do not make weekly play depend on writing new stories, challenges, or expensive model calls.
- Earned NFT badges are intended achievements. Never promise resale value, official Cosmo integration, or authorization to use artists' assets without evidence.

## Engineering invariants

- Treat hidden roles, investigations, Mafia chat, and unresolved predictions as secrets. Solidity `private` storage is publicly observable. A public random seed must not expose role assignments.
- Do not leak secret outcomes through badge events, metadata, API responses, notifications, logs, or spectator feedback. Settle secret-dependent awards after the final reveal.
- Validate actions against the authoritative match, phase, deadline, actor, and eligibility. Client clocks and interfaces are not authority.
- Make payment recording, match resolution, claims, and badge issuance idempotent. Timeouts and fallback behavior must allow a match to finish when a player disconnects.
- Keep bots within the same information boundaries as the seat they control. Programmed bots must not require a paid LLM service.
- Separate public replay data from private operational and authentication data. Never publish tokens, wallet secrets, or unreviewed private chat as a side effect of an archive export.
- Distinguish onchain assets/results from an autonomous onchain game. Record every dependency on a server, keeper, storage provider, or privileged operator.
- Benchmark the implemented contracts before quoting production fees. Research snapshots are estimates, not guarantees.

## Repository workflow

- Repository: `badgewars/badgewars`. Default branch: `main`. This project uses the `buxor` GitHub identity.
- Follow the owner's standing workflow: commit completed work and push directly to `main`; create a pull request only when explicitly requested. Do not force-push or overwrite other work.
- A successful push is not evidence of a deployment. Report local changes, checks, commits, remote state, and deployed behavior accurately.
- Use `rg` for searches. Inspect existing changes before editing and stage only task files.
- Tokens are supplied through environment variables from `~/.tokens`; use them without printing values or asking the owner to paste them. For this repository, the GitHub credential is `GITHUB_TOKEN_BUXOR`.
- Never commit credentials, private keys, seed phrases, environment files, or private exports. Add an environment example with placeholders only when an implementation actually needs it.
- Keep `CLAUDE.md` as a thin import. Update the relevant design document when a decision changes, including its status and rationale.

## Verification and local tools

- Prefer CLI, HTTP/API checks, builds, and targeted tests. For documentation changes, check links, consistency, and `git diff --check`; do not add tests that merely reproduce the text.
- For game implementation, prioritize meaningful tests for secret leakage, illegal actions, deterministic resolution, timeout recovery, duplicate payments/awards, and the actual win conditions.
- Browser checks must be headless and isolated unless the user explicitly requests visible interaction. Do not open or recreate Superset preview panes or the user's browser windows.
- Clean up only the temporary servers, browser contexts, and profiles started for the task. Preserve other work and running services.
- Follow the owner's local sandbox rules for new or untrusted tools. Do not fetch and execute remote scripts casually.
- Render is the owner's default for new hosting. Hosting and the application's technical stack have not been provisioned or selected here.
