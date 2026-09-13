# Build plan

Date: 2026-09-14. The courtroom design is accepted. This is the implementation plan, not evidence that a playable service exists. The standalone layout study is the only implemented visual artifact so far.

## Recommended order

Build the courtroom interaction first, then a deterministic match engine, then real multiplayer. Add artwork, archive, and onchain integrations to a proven playable loop. Resolve the privacy/authority model before treating the system as an onchain production game.

The first playable milestone is one complete private test with 24 seats, at least several human participants, all four roles, audience predictions, and a replay of the actual result. Bots and simulated clients can establish mechanics; only a full human playtest can establish social readability and enjoyment.

## Engineering recommendation

| Part | Recommendation | Reason / status |
| --- | --- | --- |
| Browser | Next.js 15 App Router (React 19) + Tailwind v4 + shadcn/ui + framer-motion, pinned 2026-09-14 | Evaluated TanStack Start (apollo.cafe's framework): same SSR/server-boundary benefits, but young; Next.js is already proven in this portfolio (fibor). Verified in apollo's bundles that the "feel" lives in the component layer, not the framework. Scaffolded in `apps/web` |
| Rules | Pure TypeScript package with explicit commands/events | Same deterministic rules can drive simulation, server prototype, and replay verification |
| Playtest transport | Node/TypeScript HTTP + WebSocket service | Small authority for real-time playtests; not a promise of operator-free execution |
| Playtest persistence | PostgreSQL event records, state snapshots, and unique constraints | Restore acknowledged actions and deduplicate delivery after restart |
| Hosting | Render for the test service when hosting is authorized | Owner's standing default; not provisioned |
| Assets | Versioned static portraits/backgrounds; compact onchain SVG considered for achievements | One asset set reused across matches |
| Chain | Abstract for the planned ticket/draw/achievement boundary | Same ecosystem as the earlier research; execution/privacy still needs a decision |
| Wallet | Evaluate Abstract Global Wallet with scoped authorization | Avoid per-action prompts; production session-key prerequisites must be checked |
| Awards | ERC-1155 editions with an idempotent issuance queue | Shared artwork and recoverable delivery; contract unimplemented |

Use a small workspace once implementation begins: `apps/web`, `apps/server`, `packages/rules`, and later `contracts`. Keep the fixture study separate from runtime code. Do not install a game engine, LLM service, or extra state infrastructure without a concrete need.

Vite provides a React/TypeScript template. [Vite guide](https://vite.dev/guide/)

Render supports WebSockets, but connections can terminate during instance replacement and clients may reconnect elsewhere. Durable state and reconnect recovery are required. [Render WebSockets](https://render.com/docs/websocket)

Abstract session keys can scope approved actions; current documentation says mainnet use requires a security review and policy registration. This is an external integration dependency, not something the code can declare approved. Ordinary offchain chat needs no blockchain session key. [Abstract session keys](https://docs.abs.xyz/abstract-global-wallet/session-keys/overview)

## Milestone 1 — interaction prototype

Deliver the desktop courtroom, portrait selection, trial spotlight, gallery, private role view, Match/Audience tabs, and one changing action bar. Include every phase and every perspective. Add the compact mobile arrangement before final portrait production.

The current [layout study](../design/courtroom.html) is a review aid for this milestone, not its production implementation. Fixtures and perspective selectors must not ship inside real player clients.

**Status 2026-09-14: started.** `apps/web` is scaffolded from fibor's stack with the apollo-feel theme and a fixture-driven courtroom shell (all seven phases, seat selection, trial spotlight, gallery, chat tabs with permission-aware composer, dev-only fixture bar). Remaining for this milestone: replace fixture controls with the engine-driven state, finish every perspective's private views, and the acceptance pass below.

Acceptance: the member you inspect stays selected while new chat arrives; the accused is obvious during trial; gallery has no vote; the audience cannot post into Match Chat; all controls fit at 390 and 1440 pixels. Review discussion, defense, verdict, each private night action, removal, and finale.

## v0.1 — first playable version (concrete plan, added 2026-09-14)

Goal: one complete local match, in the browser, no server — a human in one seat, programmed seats elsewhere, driven by the real rules. This collapses milestones 1–2 into a runnable increment and produces the engine everything later work reuses.

1. `packages/rules` — pure TypeScript, zero IO. Types: `MatchState`, `Command`, `PublicEvent`, `HiddenState`. A single reducer `apply(state, command, rng, clock) → state | rejection`. Seeded deterministic RNG (e.g. `@noble/hashes`-based or hand-rolled splitmix64); all randomness injected. Implements [GAMEPLAY.md](GAMEPLAY.md): discussion, accusation with hidden-until-deadline choices and tie order, single-accused trial, Remove/Spare with ties-spare, night attack/protect/investigate with protection restriction, morning reveal, parity and round-limit wins, cancellation.
2. Bots in the same package: `pickAction(state, seat, rng)` using only that seat's permitted observations — the same boundary a networked server will later enforce. Fallback is abstention.
3. `apps/web` — replace the fixture state with `useReducer` over the engine; the dev fixture bar becomes a match setup panel (seed, seat count, role mix) behind the same dev-only gate. Chat renders `PublicEvent`s; private views render per-seat projections.
4. Tests in `packages/rules` (vitest, bun test runner): replaying the accepted event log reproduces the final state; no public event, badge eligibility, or API surface ever carries role data before the finale; duplicate/late commands reject; every phase terminates with all-missing inputs; both win conditions and the round limit reachable.
5. Acceptance: a full 24-seat match with one human seat reaches a terminal result on screen; the recorded log replays to the identical result; a second run with the same seed plays identically; no fixture controls ship in a production build.

Deliberately out of v0.1: networking, auth, payments, persistence, contracts, real member art. Those are milestones 3+.

## Milestone 2 — rules and complete local match

Implement [GAMEPLAY.md](GAMEPLAY.md) as state transitions with input validation. Inject clock and random inputs rather than reading them from arbitrary UI code. Keep match version, phase/deadline, active seats, hidden roles, private actions, and public history distinct.

Implement accusation ties, Remove/Spare ties, abstention, simultaneous night actions, protection restrictions, investigation-on-removal, gallery restrictions, parity, round limit, and cancellation. Bots use the same command API with role-limited observations.

Acceptance: a full match reaches one terminal result; replaying accepted events reproduces that result; duplicate/stale commands cannot change it; night outcomes do not depend on within-window submission order. Exercise all branches and missed-action paths, not just one fixture match. Simulated balance results are screening, not proof of human balance.

## Milestone 3 — multiplayer and privacy projections

Add authenticated sessions, ticket-independent test invitations, connection recovery, phase updates, permitted chat channels, and server-side action validation. Derive a separate payload for each account. Never send the master role table and expect the browser to hide it.

Persist accepted commands/events and phase changes transactionally. Use one authority per match with a fencing/locking mechanism so two workers cannot both resolve it. A restart restores state and acknowledged choices. Timers check durable deadlines; they are not the source of truth by themselves.

Acceptance: 24 independent player sessions complete the loop; an audience session receives no private role/action/faction data; a removed Mafia seat receives no new Mafia chat; a client reconnects without duplicating messages or votes. Inject a service restart and prove either a correct resume or a visible cancellation, not silent lost actions.

## Milestone 4 — privacy and onchain architecture decision

This is a genuine dependency for the original permanence goal. A public chain cannot keep plain roles secret, and public live plaintext can be indexed into a free viewer. An onchain receipt or NFT does not make the referee autonomous.

Build a narrow feasibility experiment for hidden role assignment, private night actions, final-result verification, and recovery when a player withholds an action/reveal. Specify exactly which party can read or falsify state, who can advance deadlines, how keys are recovered, and who funds recurring calls.

Compare the measured result with the simpler trusted-referee playtest. The recommendation is to use that referee for early gameplay tests while keeping production authority undecided. Do not silently promote it to the promised permanent onchain game. If an operator-independent protocol is impractical for the first release, the resulting scope change needs an explicit product decision.

Acceptance: one documented authority model, data visibility map, measured latency/cost, failure recovery, and honest availability guarantees. A commitment that the same operator can invent is not sufficient proof of honest gameplay. Paid live distribution and later public replay must fit the chosen model.

## Milestone 5 — event registration and selection

Implement account onboarding, one entitlement per event/account, receipt recovery, optional cast candidacy, week-long registration, live check-in, frozen eligible list, verifiable draw, standby order, seat confirmation, and member preference allocation. Keep lottery randomness separate from secret-role randomness.

Choose the payment asset/rail and one-person eligibility policy before accepting money. Preserve the $1 working price without treating it as an abuse guarantee. Handle duplicate receipts, pending/failed transactions, cancellation refunds, late attendees, and the minimum-human rule.

Acceptance: the same receipt cannot create two entries; drawing cannot include a late entrant or permit discretionary rerolls; declined seats follow the original standby order; an attendee understands they bought audience participation rather than a guaranteed cast seat. A cancelled event follows the published refund policy.

## Milestone 6 — audience and earned badges

Add locked predictions, personal suspicion notes, final accuracy, objective award evaluation, peer/audience award voting, and separate rankings. Implement the revised [badge catalogue](BADGES.md); do not retain the removed jury-ballot achievement.

Build the edition contract on a test network with real per-recipient measurements. Decide transferability, metadata permanence, and sponsorship before deploying it. Separate award entitlement from mint delivery so a failed transaction can be retried safely. Persist transaction state and reconcile confirmations rather than guessing from a submit response.

Acceptance: no badge or score leaks a hidden role; an award is issued only once; an absent bot-controlled account does not farm achievements; gas is measured for realistic recipients and payloads. A failed mint does not erase a valid earned result. Production session-key approval is required only if the selected integration uses that feature.

## Milestone 7 — art, leaderboard, and replay

Replace schematic portraits with the agreed manga set, using one consistent asset manifest. Produce one courtroom and reusable lighting/action effects. Keep gameplay selectors, public member identity, and asset presentation separate.

Publish results and rankings first. Generate recaps and highlight candidates from structured public events. Feed the same public projection into a seekable replay. Maintain the old rules/asset version references needed to interpret historical matches.

Acceptance: seek to any phase and obtain the same public scene as linear playback; private chat/targets/notes are absent from the archive payload; moderation decisions carry through; reduced-motion mode shows every outcome. Verify whether spectators enjoy the event independently of cast selection.

## Milestone 8 — complete rehearsal and paid launch readiness

Run a full human rehearsal with 24 players and invited spectators. Measure reading load, participation, phase duration, no-shows, bot reliance, and audience return intent. Change timings/counts based on these results while preserving the chosen simple interaction structure.

Load-test 24 active clients plus a stepped audience workload up to the 2,000-attendee sizing scenario. Include realistic chat bursts, heartbeats, reconnect storms, and archive delivery. Set capacity from measurements, not community size. Target sub-second normal action acknowledgement in the chosen region and no lost acknowledged actions; report tail latency rather than only averages.

Rehearse operator-wide outage, draw failure, payment delay, missed night action, duplicate settlement, and exhausted gas sponsor. Determine which failures recover and which cancel. Finalize attendance terms, moderation handling, account abuse controls, asset rights, and the specific paid-selection model before a commercial event.

Acceptance: a repeatable operator runbook, verified event schedule, clear cancellation path, monitored dependencies, and evidence that the selected architecture actually matches its public claims. A build passing or a Git push is not deployment evidence.

## Dependency order and ongoing work

Milestones 1–3 establish the game. Milestone 4 determines the production authority. Testnet ticketing and awards can be explored alongside it, but paid production cannot assume that decision away. Archive recording starts with the engine; final art and replay polish follow the playable loop. The first sensible next coding task is milestone 1's production UI shell plus a minimal rules-driven discussion-to-verdict loop.

The recurring event should generate from a fixed schedule and reusable rules. Recovery jobs handle pending receipts and award delivery. Structured events produce recaps. This removes weekly story writing, but hosting, gas funding, moderation, incident response, and dependency maintenance remain operating work. Do not describe that as income with zero continuing obligations.

## Current completion

- Design direction and simplified rule structure: recorded.
- Clickable phase/perspective layout study: provided for review.
- Production UI, engine, multiplayer, identity/payment, contracts, final artwork, deployment: not started.
- Privacy protocol and production authority: unresolved.
