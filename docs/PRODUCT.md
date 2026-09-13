# Product direction

Last captured: 2026-09-14. This document records the design discussion, not an implemented product.

## Goal and decision criteria

Build a fun, financially sustainable weekly fan event that runs on reusable rules. Players should want to return for the people, deduction, performances, and achievements. Revenue should not depend on selling gameplay advantages or commissioning a new story every season.

Evaluate choices against:

1. Enjoyment for the typical attendee, including someone who never gets a cast seat.
2. Enough simultaneous participants for a lively match.
3. Fairness, legible rules, and trust in selection and results.
4. Revenue after payment, chain, moderation, and hosting costs.
5. Low recurring creative and operational work.
6. Durable ownership and replayability without overstating independence from infrastructure.

"Build once and play onchain forever" is an ambition. Hidden information, paid access, automation, and long-term availability still require a concrete technical design.

## Decision register

Accepted direction means the owner's current product direction. A proposal is a working recommendation that still needs a decision or playtesting.

| Topic | Status | Current direction |
| --- | --- | --- |
| Game | Accepted direction | Mafia / social deduction, themed around tripleS fan roleplay |
| Cast | Accepted direction | All 24 member identities appear in each match |
| Format | Accepted direction | Synchronous live text; one room and one event per week at launch |
| Schedule | Open | Friday or Saturday; exact time, time zone presentation, and duration unset |
| Growth | Accepted direction | Add rooms if demonstrated demand warrants it; no always-open matchmaking requirement |
| Live access | Accepted direction | Both players and spectators pay to access the live event |
| Registration | Accepted direction | Payment during registration; no refund merely because an attendee is not selected for the cast |
| Price | Proposal | Start at $1; $2 remains an option. $10 was discussed, not selected |
| Cast selection | Current preference | Random selection over auctions or first-come-first-served seats; eligibility and check-in mechanics unresolved |
| Registration window | Current direction | Open during the week so attendees can prepare their account and payment before game night |
| Gameplay authority | Proposal | Only cast players, including any defined jury role, decide eliminations; audience predictions do not change outcomes |
| Gambling | Accepted exclusion | No wagering, prize pool, or staking of ETH, COMO, or Objekts |
| NPCs | Accepted direction | Programmed bots can cover vacancies or disconnects; minimum human count and bot policy unset |
| Rewards | Accepted direction | Earned NFT badges, including editions shared by many recipients |
| Badge design | Proposal | The catalogue in BADGES; exact eligibility, artwork, and transferability still require decisions |
| Chain | Working technical direction | Abstract, following the current Cosmo ecosystem; see dated research |
| Onchain permanence | Goal | Durable assets and reusable rules; execution/privacy architecture unresolved |
| Public history | Accepted direction | Leaderboard page also houses previous highlights, recaps, and match results |
| Full replay | Option | Publish a transcript, a synchronized chat/action/art replay, or summaries; scope and publication policy unset |
| Name | Working name | Badge Wars / `badgewars`; no domain purchase or rights clearance established |
| Kimchi account | Open | Initial account connection idea; provider, identity proof, and purpose undefined |

## The event experience

### Before the match

An attendee sees the weekly event time, price, cast capacity, what audience participation includes, and the fact that a ticket does not guarantee a cast seat. They can register and complete account/payment setup during the week.

The proposed selection flow adds a short live check-in before the draw. Week-long registration serves preparation and purchase; check-in establishes who is actually available to play. The check-in opening, draw time, late-arrival policy, and standby window are not final.

Freeze eligible entrants before drawing. Select an ordered cast and standby list from the same committed draw. Assignment of a tripleS member identity is separate from assignment of a secret faction or power. How attendees express member preferences is still open.

The payment buys the delivered live event, including audience participation. It does not buy extra lottery weight, extra predictions, stronger roles, or a guaranteed badge. Cancellation and failed-delivery refunds need their own policy; ordinary nonselection is a different case.

### During the match

Twenty-four member portraits anchor the cast. Human players converse in live text, make accusations, defend themselves, and use their permitted actions. A member persona does not disclose a secret role.

The audience has a dedicated experience: readable discussion and phase transitions, the current cast and history, sealed predictions, personal prediction progress without correctness feedback, and postgame recognition. A live chat alone must not be the entire value proposition for hundreds of paying attendees.

The proposed boundary is strict: audience guesses do not eliminate cast members. Audience chat and live suspicion totals should also stay out of the cast's decision interface. Out-of-band collusion remains a separate problem; hiding a UI is not a complete defense.

Bots cover defined absences using code and permitted information. The interface should identify automated seats clearly. The minimum viable human attendance and cancellation threshold need playtesting.

### After the match

Reveal roles and results, resolve prediction accuracy, award eligible badges, and update the leaderboard. Keep objective wins, audience accuracy, and subjective performance awards distinct.

The **leaderboard page is also the archive**. It should let visitors find a past match, see its cast and outcome, and browse highlights and a recap. This supplies a public introduction to an otherwise paid live event.

Possible archive depth, from smallest to largest:

1. Results, selected highlights, and a structured recap.
2. A readable public-chat transcript with phase markers and actions.
3. A replay with a timeline, pause/seek controls, chat, portraits, and the same visual actions used live.

Store an event history that can support those views. Do not commit to producing every format at launch. Publishing private spy chat, deleted messages, or participant identifiers needs an explicit publication policy. Authentication and wallet secrets never belong in an archive.

## Revenue and fairness

The working recommendation is $1 for the whole interactive live event. Free access is to published post-event material. This is a change from the earlier free-live-viewing suggestion.

A fee makes repeated entries cost money; it does **not** prevent multiple wallets, prove unique people, or make a raffle fair by itself. Eligibility must be defined independently, and the same person must not be able to purchase extra selection weight under a one-person rule.

At 2,000 paid attendees, 24 cast seats represent only 1.2% of attendance. The other 98.8% must value the audience experience enough to return. That example yields $2,000 gross at $1, before costs; it is not a demand forecast. The cited Reddit community size is a reach hypothesis, not evidence that thousands will buy weekly tickets.

Useful early measures are registration-to-attendance conversion, returning paid attendees, prediction participation, cast no-shows, bot share, support incidents, and net revenue per delivered event. Raising the price should follow retention evidence.

## Questions to resolve as work reaches them

- Exact schedule, match duration, registration/check-in deadlines, and human attendance threshold.
- One-person eligibility, account recovery, wallet onboarding, and the intended Kimchi connection.
- Member preference allocation, standby replacements, disconnect policy, and proportionate no-show penalties. A ten-week ban was discussed, not adopted as a settled rule.
- Final rules, role balance, jury powers, and whether all 24 seats remain fun to follow in text.
- Payment asset/rail, fees, failed-delivery refunds, and terms for paid random cast selection.
- Hidden-state authority, automation, live access control, and the actual degree of onchain execution.
- Badge transferability, definition of "inscribed," final art format, and permanent metadata policy.
- Rights to names, portraits, show branding, and commercial fan use. The project has no established official license; an extra "s" is not evidence of legal clearance.
- Archive publication, moderation, participant privacy, and replay scope.

## Earlier ideas, outside the current scope

Collectible-card combat, a branching manga adventure, idol management, courtroom battles, asynchronous play, a solo campaign, role auctions, and paid wagering were explored. Do not quietly combine them into the launch specification. The reusable social-deduction event is the current direction.
