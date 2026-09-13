# Product direction

Updated 2026-09-14 after acceptance of the simplified courtroom design and the request for a build plan. This records product direction, not implemented multiplayer behavior.

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
| Setting and names | Accepted direction | Manga courtroom; Mafia versus Citizens; Detective and Doctor belong to the Citizen faction |
| Trial | Accepted direction | One accused member; active players choose Remove badge or Spare |
| Removal | Accepted direction | Move into the gallery; retain discussion but lose voting and night powers |
| Layout | Accepted direction | Courtroom and persistent portraits in the center; chat right; gallery below; action bar at the bottom |
| Chat | Accepted direction | Cast writes in Match Chat; audience reads it and writes in separate Audience Chat |
| Format | Accepted direction | Synchronous live text; one room and one event per week at launch |
| Schedule | Open | Friday or Saturday; exact time, time zone presentation, and duration unset |
| Growth | Accepted direction | Add rooms if demonstrated demand warrants it; no always-open matchmaking requirement |
| Live access | Accepted direction | Both players and spectators pay to access the live event |
| Registration | Accepted direction | Payment during registration; no refund merely because an attendee is not selected for the cast |
| Price | Proposal | Start at $1; $2 remains an option. $10 was discussed, not selected |
| Cast selection | Current preference | Random selection over auctions or first-come-first-served seats; eligibility and check-in mechanics unresolved |
| Registration window | Current direction | Open during the week so attendees can prepare their account and payment before game night |
| Gameplay authority | Accepted direction | Only active cast seats decide eliminations; gallery and audience have no trial vote |
| Gambling | Accepted exclusion | No wagering, prize pool, or staking of ETH, COMO, or Objekts |
| NPCs | Accepted direction | Programmed bots can cover vacancies or disconnects; minimum human count and bot policy unset |
| Rewards | Accepted direction | Earned NFT badges, including editions shared by many recipients |
| Badge design | Proposal | The catalogue in BADGES; exact eligibility, artwork, and transferability still require decisions |
| Chain | Working technical direction | Abstract, following the current Cosmo ecosystem; see dated research |
| Onchain permanence | Goal | Durable assets and reusable rules; execution/privacy architecture unresolved |
| Public history | Accepted direction | Leaderboard page also houses previous highlights, recaps, and match results |
| Public replay | Accepted direction | Replay public chat and game actions; private Mafia chat stays excluded by default |
| Name | Working name | Badge Wars / `badgewars`; no domain purchase or rights clearance established |
| Kimchi account | Open | Initial account connection idea; provider, identity proof, and purpose undefined |

## The event experience

### Before the match

An attendee sees the weekly event time, price, cast capacity, what audience participation includes, and the fact that a ticket does not guarantee a cast seat. They can register and complete account/payment setup during the week.

The proposed selection flow adds a short live check-in before the draw. Week-long registration serves preparation and purchase; check-in establishes who is actually available to play. The check-in opening, draw time, late-arrival policy, and standby window are not final.

Freeze eligible entrants before drawing. Select an ordered cast and standby list from the same committed draw. Assignment of a tripleS member identity is separate from assignment of a secret faction or power. How attendees express member preferences is still open.

The payment buys the delivered live event, including audience participation. It does not buy extra lottery weight, extra predictions, stronger roles, or a guaranteed badge. Cancellation and failed-delivery refunds need their own policy; ordinary nonselection is a different case.

### During the match

Twenty-four portraits anchor the courtroom. Match Chat sits to the right and the gallery below the active cast. Human players discuss, accuse, defend, and use a phase-specific action bar. A member persona does not disclose a secret role. See [UI.md](UI.md) for the design.

The audience has a dedicated experience: readable discussion and phase transitions, the current cast and history, sealed predictions, personal prediction progress without correctness feedback, and postgame recognition. A live chat alone must not be the entire value proposition for hundreds of paying attendees.

Audience guesses do not eliminate cast members. Spectators read Match Chat and write in Audience Chat. Cast accounts, including gallery members, cannot access Audience Chat during play. Live suspicion totals stay out of the cast's interface. Out-of-band collusion remains a separate problem; hiding a UI is not a complete defense.

Bots cover defined absences using code and permitted information. The interface should identify automated seats clearly. The minimum viable human attendance and cancellation threshold need playtesting.

### After the match

Reveal roles and results, resolve prediction accuracy, award eligible badges, and update the leaderboard. Keep objective wins, audience accuracy, and subjective performance awards distinct.

The **leaderboard page is also the archive**. It should let visitors find a past match, see its cast and outcome, and browse highlights and a recap. This supplies a public introduction to an otherwise paid live event.

Build the archive in this order:

1. Results, selected highlights, and a structured recap.
2. A readable public-chat transcript with phase markers and actions.
3. A replay with a timeline, pause/seek controls, chat, portraits, and the same visual actions used live.

Store public event history from the first playable build. Replay is in the build plan; its polish follows the playable match. Exclude private Mafia chat, private targets, and personal notebooks from the public archive. Moderation removals and participant identifiers still need a publication policy. Authentication and wallet secrets never belong in an archive.

## Revenue and fairness

The working recommendation is $1 for the whole interactive live event. Free access is to published post-event material. This is a change from the earlier free-live-viewing suggestion.

A fee makes repeated entries cost money; it does **not** prevent multiple wallets, prove unique people, or make a raffle fair by itself. Eligibility must be defined independently, and the same person must not be able to purchase extra selection weight under a one-person rule.

At 2,000 paid attendees, 24 cast seats represent only 1.2% of attendance. The other 98.8% must value the audience experience enough to return. That example yields $2,000 gross at $1, before costs; it is not a demand forecast. The cited Reddit community size is a reach hypothesis, not evidence that thousands will buy weekly tickets.

Useful early measures are registration-to-attendance conversion, returning paid attendees, prediction participation, cast no-shows, bot share, support incidents, and net revenue per delivered event. Raising the price should follow retention evidence.

## Questions to resolve as work reaches them

- Exact schedule, match duration, registration/check-in deadlines, and human attendance threshold.
- One-person eligibility, account recovery, wallet onboarding, and the intended Kimchi connection.
- Member preference allocation, standby replacements, disconnect policy, and proportionate no-show penalties. A ten-week ban was discussed, not adopted as a settled rule.
- Role balance, timings, message limits, and whether all 24 seats remain fun to follow in text. The single-accused trial and non-voting gallery are selected.
- Payment asset/rail, fees, failed-delivery refunds, and terms for paid random cast selection.
- Hidden-state authority, automation, live access control, and the actual degree of onchain execution.
- Badge transferability, definition of "inscribed," final art format, and permanent metadata policy.
- Rights to names, portraits, show branding, and commercial fan use. The project has no established official license; an extra "s" is not evidence of legal clearance.
- Archive moderation, participant privacy, and final replay presentation.

## Earlier ideas, outside the current scope

Collectible-card combat, a branching manga adventure, idol management, standalone courtroom puzzle battles, asynchronous play, a solo campaign, role auctions, and paid wagering were explored. Do not combine them into the launch specification. The courtroom is now the presentation for the social-deduction event.

The initial two-nominee trial, Agents/Spies/Guardian terminology, and one-use jury ballot are superseded. Use [GAMEPLAY.md](GAMEPLAY.md), [UI.md](UI.md), and [BUILD_PLAN.md](BUILD_PLAN.md) for the current design.
