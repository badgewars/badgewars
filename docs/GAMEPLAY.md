# Courtroom Mafia rules

Updated 2026-09-14. The owner accepted the courtroom, role names, single-accused trial, two-button verdict, and non-voting gallery. Numbers below are prototype defaults that require playtesting. No multiplayer engine exists yet.

## Terms and roles

| Term | Meaning |
| --- | --- |
| Member | The tripleS identity a seat embodies, independent of secret role |
| Citizen | Faction trying to remove all Mafia |
| Detective | Citizen faction; investigates one other active member at night |
| Doctor | Citizen faction; protects one active member at night |
| Mafia | Hidden faction; collectively attacks one active non-Mafia member at night |
| Active cast | Seats with a game badge; may accuse and vote |
| Gallery | Removed cast; may discuss but cannot accuse, vote, or use night powers |
| Audience | Paid attendees outside the cast; read the match and make predictions |
| Game badge | A seat's active status in this match, separate from NFT achievements |

Start with 16 ordinary Citizens, one Detective, one Doctor, and six Mafia: 18 Citizen-faction seats versus six Mafia. All 24 member identities appear. Special roles do not change the public portrait or label.

## Before play

Open paid registration during the week. Offer the cast draw as an option alongside audience access. Record three preferred members. Use the random cast order to allocate each selected attendee's highest available preference, then randomly allocate remaining members. Preferences do not affect secret roles.

Prototype schedule: check-in opens 30 minutes before play; freezes ten minutes before play; selected attendees get one minute to accept. Use one frozen eligible list and ordered standby list. Finish seating before distributing secrets. Do not introduce a new human into a seat after secrets have been distributed.

Eligibility, minimum attendance, bot ceiling, and cancellation terms must be settled before paid operation. Account uniqueness is not human uniqueness. These questions do not block local playtests.

Start with discussion. Nobody loses a badge before the opening conversation.

## Round sequence

`discussion -> accusation -> defense -> verdict -> night -> morning`

| Phase | Prototype duration | Main action |
| --- | ---: | --- |
| Discussion | 180 seconds | Read/send Match Chat and inspect public histories |
| Accusation | 30 seconds | Accuse one other active member or abstain |
| Defense | 30 seconds | The sole accused member writes a defense |
| Verdict | 30 seconds | Active seats choose Remove badge or Spare |
| Night | 45 seconds | Mafia attack; Doctor protects; Detective investigates |
| Morning | 15 seconds | Announce public effects and check the result |

A full round is 5.5 minutes. Twelve rounds plus opening and closing are roughly 75 minutes; this is a pacing hypothesis. Skipped trials and early victories shorten matches.

Cast discussion is open during discussion and accusation. During defense only the accused may write. Cast writing pauses during verdict, night, and morning. Audience Chat remains available to audience accounts. Everyone retains access to their permitted history.

Start with three messages of up to 240 characters per cast member per discussion/accusation period, including gallery members. Allow one defense of up to 500 characters. Measure reading load before adopting these limits. Accepted text cannot be edited after the fact. Quotes do not bypass limits.

## Accusation and verdict

Each active seat can accuse one other active seat. The latest valid choice received before the deadline counts. Abstention or a missing choice contributes nothing. Keep choices hidden until the deadline, then publish them together.

The highest accusation count selects one accused member. Break ties using a published circular member order, starting at a different position each round. Skip defense and verdict if nobody is accused.

Every active seat, including the accused, may vote Remove badge or Spare. Votes can change until the deadline; the latest valid choice counts. Missing ballots abstain. Publish ballots together after locking them.

Remove the accused only when Remove votes exceed Spare votes. Ties, including zero-zero, spare them. This is a majority of non-abstaining ballots, not all active seats. Move the removed member to the gallery without revealing their role. Check victory immediately; skip night if the match has ended.

## Night

Use the same snapshot of active seats at night opening. Accept changes until the deadline and resolve together without dependence on arrival order.

- Each active Mafia seat chooses one active non-Mafia target. Unique plurality produces one attack; tied highest votes or no votes produce none. Active Mafia coordinate in private faction chat during night.
- The Doctor selects an active seat, including themselves. They cannot protect the same seat on consecutive nights. A missed night clears that previous-night restriction. Protection blocks an attack on the selected seat. Do not send success confirmation.
- The Detective selects another active seat. Privately return only Mafia or Citizen after resolution. Honor a valid investigation even if the Detective loses their badge that night.
- Missing actions do nothing unless a permitted bot has already supplied a legal choice.
- Announce who lost their badge or that nobody did. Do not reveal failed-attack causes, private targets, or roles.

Gallery members receive no new powers or faction-chat messages. Removed Mafia still remember teammates; the rules cannot erase knowledge. A removed Detective retains results already received.

## Victory and limit

Check after each resolved badge loss and each completed round, in this order:

1. Citizens win when no active Mafia remain.
2. Otherwise Mafia win when active Mafia equal or outnumber active Citizen-faction seats.
3. Prototype hard limit: Mafia win if any remain after twelve completed rounds.

Gallery members do not count toward parity. They remain on their original team for achievement eligibility. Cancellation/invalidity are separate terminal states and do not silently award victory.

## Atomic commands

A command carries match ID, phase ID, authenticated actor, unique command ID, and payload. The authority assigns receipt time and ordering. Duplicate delivery returns the original acknowledgement rather than repeating the effect.

| Command | Actor | Effect |
| --- | --- | --- |
| Register | Attendee | Record entitlement after confirmed payment |
| Check in | Eligible ticket holder | Join available-player set before freezing |
| Accept seat | Selected account / next standby | Confirm the allocated seat before seating closes |
| Send message | Channel-authorized account | Append text within phase/rate limits |
| Accuse | Active cast | Set one active non-self target or abstention |
| Defend | Accused member | Append defense within its window |
| Vote | Active cast | Set Remove or Spare |
| Attack | Active Mafia | Set legal night target |
| Protect | Active Doctor | Set legal protection target |
| Investigate | Active Detective | Set legal investigation target |
| Predict | Eligible audience | Lock one valid prediction with no revision |
| Award vote | Eligible participant | Vote in the specified postgame award |
| Resume | Seat owner | Resume current state without undoing resolved actions |
| Advance | Rules resolver | Close a phase once its authoritative deadline expires |
| Settle awards | Awards resolver | Record each final entitlement once |

Opening portraits, filtering history, drafting text, and keeping private notes are local actions. They do not accuse someone or broadcast a selection.

## Audience and recovery

Audience accounts read Match Chat and write in Audience Chat. Cast accounts, including the gallery, cannot access Audience Chat during play. Predictions never control verdicts. See [BADGES.md](BADGES.md).

Programmed bots can cover vacancies and missed active-seat actions. Label automated control. Bots receive only permitted seat information and require no LLM calls. A human may resume before a phase lock; completed actions cannot be undone. Test the takeover grace period and trigger rather than treating a backgrounded browser tab as abandonment.

Individual disconnections do not pause the clock. A platform-wide outage requires explicit recovery or cancellation; do not fast-forward through multiple unplayable phases. Restore acknowledged actions from durable state. Do not penalize a no-show caused by a verified service failure.

The first full playtest must establish readable discussion, meaningful audience involvement, plausible wins for both factions, and recovery without secret leakage.
