# Gameplay working draft

**Status: proposed rules, not approved balance or implemented behavior.** The accepted foundation is a weekly synchronous live-text event with all 24 member identities. This draft makes the discussed mechanics concrete enough to prototype and test.

## Identities and roles

Member identity, account identity, and secret role are separate. A player embodies a member; their member portrait does not imply a faction or special ability. Identity allocation and secret-role assignment happen after the eligible cast is locked.

Proposed 24-seat distribution:

| Role | Seats | Information and action |
| --- | ---: | --- |
| Agent | 16 | Knows own allegiance; discusses, nominates, and votes |
| Investigator | 1 | Agent faction; privately checks one other active seat each night |
| Guardian | 1 | Agent faction; privately protects one active seat each night |
| Spy | 6 | Knows fellow spies; participates in private night discussion and attack selection |

That is 18 Agent-faction seats and six Spies. Counts, investigation strength, unrevealed eliminations, and jury votes interact; this is not a claim of balance.

## Proposed lifecycle

`scheduled -> registration -> check-in -> draw -> seating -> active rounds -> final reveal -> awards -> archived`

A cancelled event is a separate terminal outcome. Every state needs explicit entry conditions, deadlines, permitted actions, and recovery behavior. Exact pregame timings remain open; a draw roughly ten minutes before play was discussed.

1. Register: record one event entitlement after successful payment.
2. Check in: eligible attendees indicate availability for the cast.
3. Freeze: commit the eligible list before requesting public selection randomness.
4. Draw: derive the cast and an ordered standby queue; do not reroll for a preferred result.
5. Seat: confirm attendance, allocate member identities, and fill permitted vacancies.
6. Assign secrets: distribute roles through a privacy-preserving mechanism that is still to be chosen.
7. Play: start with public discussion so nobody is removed before taking part.
8. Finish: reveal roles, resolve objective results, close any award voting, and issue badges once.

Do not let the public seat-selection seed also disclose secret roles. Cast selection fairness and one-person eligibility are separate requirements.

## Atomic actions

These are conceptual commands, not implemented API names. Every submission must identify the event, actor, applicable phase, and unique request. Repeated delivery must not repeat the effect.

| Action | Who | Effect / deadline |
| --- | --- | --- |
| Register | Attendee | Creates an entitlement once payment is confirmed; no guaranteed cast seat |
| Check in | Eligible ticket holder | Enters the available-player set before it freezes |
| Accept seat | Selected attendee or next standby | Claims only the assigned seat within the seating window |
| Send public message | Permitted cast participant | Adds a moderated, ordered message during permitted phases |
| Nominate | Active cast seat | Selects one other active seat or abstains before nomination lock |
| Defend | Trial nominee | Uses the nominee's allotted text window |
| Vote | Active seat; eligible jury seat | Chooses nominee A, nominee B, or spare both before ballot lock |
| Spy message | Spy seat | Sends a private faction message during the permitted night phase |
| Choose attack | Active Spy | Selects a legal active non-Spy target before night lock |
| Protect | Active Guardian | Selects a legal target before night lock |
| Investigate | Active Investigator | Selects another active seat before night lock |
| Predict | Eligible audience attendee | Locks one legal suspect for an open prediction window |
| Cast award vote | Eligible participant | Votes once per defined postgame award; no self-vote where specified |
| Reconnect | Seat owner | Resumes permitted control without undoing actions already resolved |
| Advance phase | Resolver | Resolves a closed phase exactly once; verifies time and state |
| Finalize awards | Resolver | Derives and records entitlements once the relevant facts are public |

Whether ordinary action choices can be revised before their deadline is open. Spectator predictions are deliberately final once submitted in the proposed design. Missing optional choices resolve as abstentions unless a permitted bot has supplied the action.

## A proposed round

| Phase | Draft duration | Rule |
| --- | ---: | --- |
| Discussion | 3 minutes | Public live text and review of previous actions |
| Nomination | 30 seconds | Active seats nominate privately; reveal nominations at the deadline |
| Defense | 1 minute | Two nominees get 30 seconds each |
| Ballot | 30 seconds | Hidden ballots; reveal choices and voter identities after locking |
| Night | 45 seconds | Spies, Guardian, and Investigator submit simultaneously |
| Resolution | About 15 seconds | Announce public effects, update active cast, check end conditions |

The draft is about six minutes per full round. A twelve-round limit would put the match around 80 minutes including opening and ending. Short trials or an early win shorten it; pacing needs human playtests.

### Trial resolution

Take the top two nominated active seats. Break nomination ties using a rotating, publicly defined member order. Skip the trial when nobody is nominated. The one-nominee case and the exact rotating order must be specified before implementing this rule.

The ballot has three choices: remove A, remove B, or spare both. Remove a nominee only when that option has a unique highest vote count. Ties spare the nominees. An abstention contributes no vote. This is a plurality proposal, not a majority requirement.

Check win conditions after a day removal before opening another night. Do not reveal a removed seat's role during ordinary play in this draft.

### Simultaneous night resolution

- Active Spies select an active non-Spy target. A unique plurality produces one attack; a tie or no votes produces none.
- The Guardian may protect any active seat, including themselves, but not the same seat on consecutive nights. Protection blocks that night's attack on that seat. Do not send a private success confirmation.
- The Investigator checks one other active seat and receives only its faction, Agent or Spy. Resolve a valid submitted investigation even if the Investigator is removed that night.
- Resolve from the same snapshot of eligible actors at night opening. Do not make results depend on transaction arrival order within the valid window.
- Announce who lost their badge, or that no badge was lost. Do not disclose the cause of a failed attack or a hidden role.

## Removal and jury participation

Proposed rule: losing a badge moves a player to the jury. They retain their member identity, allegiance, and permitted public discussion, but lose nominations and night powers. They retain **one final trial vote for the rest of the match**. Once used, it is spent.

Jury members receive no new privileged information beyond their existing knowledge. Spies already know their teammates and cannot be made to forget them; further private-chat access for removed Spies must be defined. Leaving after active duty ends should not automatically count as abandoning an active seat.

This rule is intended to keep removed humans involved, but its balance and chat load need testing. Jury votes do not count as active bodies in the parity win condition.

## Win conditions

- Agents win when no active Spies remain.
- Spies win when at least one active Spy remains and active Spies equal or outnumber active Agent-faction seats.
- Proposed hard limit: if Spies remain after twelve complete rounds, Spies win.

Check the Agent win before Spy parity, including any zero-active-seat edge case. Define terminal ordering and cancellation separately; an incomplete match must not silently count as a victory.

## Audience play

The proposed prediction game and its awards live in [BADGES.md](BADGES.md). Audience votes do not remove players. Audience performance voting happens after the competitive result is fixed.

Do not show a spectator a role, secret action, or guess correctness before the final reveal. Restricting correctness feedback also applies to NFT issuance, APIs, and metadata.

## Absences, bots, and abuse

Programmed NPCs may supply legal actions when seats are vacant or unavailable. They operate from that seat's permitted observations, never an omniscient role table. A simple fallback should be abstention rather than a phase that never finishes. Their difficulty and text behavior are not designed yet.

A short reconnect grace period, such as two minutes, is a proposal. A returning player resumes from current state and cannot undo a bot's completed action. The ownership and badge eligibility of a seat partly controlled by a bot need explicit rules.

Minimum human attendance, maximum starting bots, replacement cutoffs, and no-show penalties remain open. Twenty humans plus up to four starting bots was one possible threshold, not an accepted constraint. A fee alone does not prevent alternate accounts, collusion, harassment, or spectator-to-player leaks.

## What the prototype must establish

- Twenty-four people can follow the text without drowning out discussion.
- All phases terminate under missed inputs, disconnects, and duplicate requests.
- Spies and Agents both have plausible paths to victory under the jury and secrecy rules.
- Players cannot read another role or infer it from award traffic.
- Audience predictions reward deduction without becoming a trivial guess-everyone strategy.
- Replaying recorded actions produces the same public result and award eligibility.
