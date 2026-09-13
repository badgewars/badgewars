# Architecture notes

**Status: constraints and implementation recommendations.** No stack, privacy protocol, wallet integration, contracts, or hosting has been implemented.

## Separate the responsibilities

| Responsibility | Required behavior | Current status |
| --- | --- | --- |
| Identity and eligibility | Establish account control and the rule for one eligible person | Unresolved; a wallet is not proof of a unique person |
| Ticketing | Record paid event access exactly once and apply explicit cancellation rules | Payment rail and contract/server boundary unresolved |
| Cast draw | Freeze entrants, obtain verifiable randomness, derive cast and standbys without rerolls | Abstract randomness options researched; no integration |
| Secret-role distribution | Give each seat only its permitted role/faction information | Privacy and trust model unresolved |
| Game engine | Enforce phases, legal actions, deadlines, simultaneous resolution, and terminal results | Proposed deterministic state machine |
| Live transport | Deliver timely text and permitted events to cast/audience | Server or alternative transport unresolved |
| Bots | Supply legal fallback actions using seat-limited knowledge | Programmed NPC direction; behavior unimplemented |
| Awards | Derive eligibility and issue each earned edition once | ERC-1155 recommendation; contract unimplemented |
| Archive | Publish results, recaps, highlights, and optionally replay | Public event projection proposed |

## Onchain boundaries and privacy

Abstract is the working chain direction because Cosmo moved there. Sharing a chain can simplify ownership reads and remove a bridge requirement. It does not establish access to Cosmo account signatures, transfer rights, an official API, or permission to reuse Objekts commercially.

Never put hidden roles in public contract storage, calldata, events, URLs, or client bundles. Solidity `private` controls contract-level access, not public observability. Random seat selection and secret role assignment need separate designs.

A trusted referee service is a possible prototype route, with an explicit trust and availability dependency. Privacy-preserving onchain execution is a different engineering commitment; it has not been chosen or proven. Onchain ticketing, badges, and final results alone do not make the match fully onchain.

A contract does not wake itself up at a weekly time or phase deadline. Specify who submits phase-advance transactions, who pays, and how another caller can recover after a missed action. Sponsor balances, RPC availability, indexing, storage, and frontend availability also need durable operating plans.

## Paid live access and public history

The selected product direction charges for live access and publishes post-event material. Public plaintext game actions on a blockchain can be indexed into an unofficial free live viewer. A UI paywall cannot prevent that.

Before promising both paid-only live viewing and autonomous public-chain execution, choose how live data is restricted or delayed, who controls the keys, and when public history becomes available. Encryption or server delivery introduces its own trust, recovery, and availability requirements. No paywall can prevent an attendee from sharing what they can see.

The public archive should be a deliberate projection, not an export of the operational database. Define publication rules for public chat, private faction chat, moderation removals, player labels, and postgame role reveals.

## Deterministic events and replay

Recommended foundation: an ordered event stream plus a deterministic rules engine. Record enough information to resolve a match, audit award eligibility, and reconstruct the public presentation without maintaining separate contradictory histories.

Conceptual event fields:

- Match ID, rules version, phase ID, and monotonic sequence.
- Event type, actor or seat, authoritative timestamp, and payload.
- Action/request identifier for deduplication and an explicit visibility class.
- For visual events, a stable action and asset reference so a later viewer can reproduce the presentation.

These are design requirements, not an approved schema. Secret payloads must not enter the public event stream before their allowed reveal. Operational credentials never belong in the replay model at all.

A public replay can combine phase transitions, chat, nominations, revealed ballots, removals, portraits/expressions, and final results. Chat ordering and game ordering must be coherent. Retain versioned rules and asset references so old matches remain interpretable after future changes.

Derived views include:

- Match results and cast history.
- Leaderboards for faction wins, audience prediction accuracy, and separately labeled social awards.
- Structured recaps and candidate highlights derived from game events.
- A transcript or seekable visual replay if that scope is selected.

Routine recaps should be possible from structured facts and templates. An LLM can be optional later; it must not be necessary for weekly operation or trusted result calculation.

## Consistency and recovery

- Reject actions from the wrong match, phase, actor, or eligibility state, including stale requests after reconnect.
- Use authoritative deadlines; clients display time but cannot extend a phase.
- Resolve simultaneous actions from a defined phase snapshot and specify terminal-order precedence.
- Deduplicate payment events, phase transitions, award entitlements, and mint requests.
- Separate entitlement calculation from transaction submission so failed mint delivery can retry without awarding twice.
- Keep deterministic bot behavior within the same legal action and information boundaries as humans.
- Define cancellation, interrupted-match recovery, and finalization before accepting production payments.

## Suggested implementation sequence

1. Build a rules-only local simulator with no payments or live-chain transactions. Exercise normal games, timeouts, jury rules, and terminal edge cases.
2. Prototype the live-text cast and audience interfaces around that engine. Test readability with a full 24-seat match and useful audience predictions.
3. Decide the identity, privacy, transport, and payment boundaries with measured gameplay needs in hand.
4. Implement event history and the leaderboard/results archive. Add transcript or visual replay only to the chosen scope.
5. Implement and benchmark badge editions and ticket/draw components on a test network, including duplicate delivery and secret-leak checks.
6. Run the full event lifecycle, including check-in, standby selection, bot takeover, cancellation, final reveal, and award retries, before a paid launch.

This is a proposed order of work, not authorization to provision services or deploy contracts during documentation setup. Document real run/build/test commands when the application exists. The owner's default host is Render; it is not currently provisioned.
