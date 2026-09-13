# Courtroom Mafia rules

Updated 2026-09-14. The owner accepted the courtroom, role names, single-accused trial, two-button verdict, and non-voting gallery. Numbers below are prototype defaults that require playtesting. No multiplayer engine exists yet.

## Terms and roles

| Term | Meaning |
| --- | --- |
| Member | The tripleS identity a seat embodies, independent of secret role |
| Citizen | Faction trying to remove all Mafia |
| Detective | Citizen faction; investigates one other active member at night |
| Lawyer | Citizen faction; secures one active member's alibi at night |
| Mafia | Hidden faction; collectively frames one active non-Mafia member at night |
| Active cast | Seats with a game badge; may accuse and vote |
| Gallery | Removed cast; loses the game badge, Match Chat writing, accusation, votes, and night powers; may talk with other removed members in the gallery channel |
| Audience | Paid attendees outside the cast; read the match and make predictions |
| Game badge | A seat's active status in this match, separate from NFT achievements |

Start with 16 ordinary Citizens, one Detective, one Lawyer, and six Mafia: 18 Citizen-faction seats versus six Mafia. All 24 member identities appear. Special roles do not change the public portrait or label.

## Before play

Open paid registration during the week. Offer the cast draw as an option alongside audience access. Record three preferred members. Use the random cast order to allocate each selected attendee's highest available preference, then randomly allocate remaining members. Preferences do not affect secret roles.

Prototype schedule: check-in opens 30 minutes before play; freezes ten minutes before play; selected attendees get one minute to accept. Use one frozen eligible list and ordered standby list. Finish seating before distributing secrets. Do not introduce a new human into a seat after secrets have been distributed.

Eligibility, minimum attendance, bot ceiling, and cancellation terms must be settled before paid operation. Account uniqueness is not human uniqueness. These questions do not block local playtests.

Start with discussion. Nobody loses a badge before the opening conversation.

## Round sequence

Accepted show structure 2026-09-14: **day is scenes, night is the court session.** Like a survival show — daytime slice-of-life with the members, evening elimination ceremony. The mechanics are unchanged; the fiction and content layer are new. Unimplemented; timings are hypotheses.

`dawn -> day (scenes) -> dusk (accusation) -> night court (defense, verdict) -> late night (hidden actions) -> dawn`

| Phase | Prototype duration | Main action |
| --- | ---: | --- |
| Dawn | 15 seconds | Announce arrests, drop the case file, check the result |
| Day | 2 scene turns | Play scene actions from the fixed deck; Match Chat stays open |
| Dusk | 30 seconds | Accuse one other active member or abstain |
| Night court | 60 seconds | Defense, then active seats choose Arrest or Acquit |
| Late night | 45 seconds | Mafia frames; Lawyer secures an alibi; Detective investigates |

A full round is roughly 6.5 minutes; eight to twelve rounds is the pacing hypothesis to playtest. Skipped trials and early victories shorten matches. The old flat sequence (discussion -> verdict -> night -> morning) is the same loop without the scene layer.

Cast discussion is open during discussion and accusation. During defense only the accused may write. Cast writing pauses during verdict, night, and morning. Audience Chat remains available to audience accounts. Everyone retains access to their permitted history.

**Removed members do not speak in Match Chat** — the classic rule: once your badge is gone, your public voice is gone. A removed member reads Match Chat and may write only in the gallery channel, a removed-members-only room. Gallery chat gives a night-one removal somewhere to enjoy the match without any route back into the game: active players and the audience cannot see it during play, it is excluded from the public archive, and removed members have nothing to spend it on. Removed Mafia also lose the Mafia channel immediately and cannot regain it.

Every elimination, day or night, is an **arrest**: the member loses their game badge, their public voice ends, and they are taken to the gallery. By day the court arrests on a verdict; by night the Mafia frame someone and the arrest lands at morning. One verb, no deaths — this is a crime procedural, and the badge is the player's license to play. Morning announcements state who was arrested, never how the frame failed or who ordered it.

## Day scenes (accepted direction 2026-09-14, unimplemented)

The day gives every active member two **scene turns**. Each turn, play one action from the fixed deck below — the same deck every week, no hand-written content. Chat stays open during the day; a scene action is a decision the game renders, not a mini-game: there is no skill test, no dexterity, no score.

| Action | Target | Resolution |
| --- | --- | --- |
| Pair up | One other active member | Public scene card: both portraits together. Pairings are public facts. |
| Records room | — | Public card shows the visit; privately you receive a highlight of the public record (e.g., who voted together in round 1). Public data, private convenience. |
| Public statement | — | One 240-character in-persona line, styled as a statement in Match Chat. This is the chat action in scene clothing. |
| Studio practice | — | Public card: practicing alone. Visibility is a choice — being seen and being absent are both information. |
| Alibi wing | — | Public card: the visit. Flavor and case-file fodder; it has no mechanical block. Only the Lawyer's alibi blocks a frame. |

Resolution rules:

- Scene outcomes render as **scene cards**: portrait, one location backdrop, one caption line. Five reusable backdrops (dorm, studio, records room, courtyard, alibi wing); no new art per week.
- Every public scene outcome becomes a **fact in the public event log**, which is what case files draw from. The day's choices are the next dawn's evidence.
- Scene actions never reference, reveal, or depend on secret roles. The anti-leak test for case files applies identically to scene generation: identical public logs must produce identical scenes with or without private state.
- Arrested members play no scene actions; their gallery channel remains their only outlet.
- The audience sees every public scene card. Private records-room highlights are never published, in the archive or anywhere else.

Start with three messages of up to 240 characters per active cast member per discussion/accusation period. Allow one defense of up to 500 characters. Measure reading load before adopting these limits. Accepted text cannot be edited after the fact. Quotes do not bypass limits.

## Accusation and verdict

Each active seat can accuse one other active seat. The latest valid choice received before the deadline counts. Abstention or a missing choice contributes nothing. Keep choices hidden until the deadline, then publish them together.

The highest accusation count selects one accused member. Break ties using a published circular member order, starting at a different position each round. Skip defense and verdict if nobody is accused.

Every active seat, including the accused, may vote Arrest or Acquit. Votes can change until the deadline; the latest valid choice counts. Missing ballots abstain. Publish ballots together after locking them.

Arrest the accused only when Arrest votes exceed Acquit votes. Ties, including zero-zero, acquit. This is a majority of non-abstaining ballots, not all active seats. Move the arrested member to the gallery without revealing their role. Check victory immediately; skip night if the match has ended.

## Night

Use the same snapshot of active seats at night opening. Accept changes until the deadline and resolve together without dependence on arrival order.

- Each active Mafia seat chooses one active non-Mafia target to frame. Unique plurality produces one frame; tied highest votes or no votes produce none. Active Mafia coordinate in private faction chat during night.
- The Lawyer selects an active seat, including themselves, and secures that seat's alibi. They cannot secure the same seat on consecutive nights. A missed night clears that previous-night restriction. A secured alibi blocks a frame on the selected seat. Do not send success confirmation.
- The Detective selects another active seat. Privately return only Mafia or Citizen after resolution. Honor a valid investigation even if the Detective loses their badge that night.
- Missing actions do nothing unless a permitted bot has already supplied a legal choice.
- Announce who was arrested or that no one was. Do not reveal why a frame failed, private targets, or roles.

Gallery members receive no new powers and no faction-chat messages. Removed Mafia still remember teammates; the rules cannot erase knowledge. A removed Detective retains results already received. Gallery chatter cannot change the game: it reaches only other removed members, stays out of the archive, and carries no vote, action, or public voice.

## Morning case files (proposal, accepted for demo 2026-09-14)

At every morning, after the arrest announcement, the authority publishes one or two **case-file lines** — a standing evidence beat that gives the table something concrete to argue about. Rules of the mechanism:

- Derived **only from the public event log** after the lock: chat volume/silence, published accusation records, published ballots, and public announcements. A case file never references secret roles, faction membership, night targets, alibis, failed-frame causes, or anything the public record does not already contain. Patterns over public actions are the content.
- The same code generator runs every week. No hand-written lines, no model calls, no weekly content work.
- Catalog (seeded): members sending zero public messages in the round; accusation streaks ("accused in every round so far", "accused the same seat twice running"); acquittal records ("every member this seat accused has been acquitted"); ballot blocs ("the same five seats voted together on every ballot"); volume swings ("this seat's public messages dropped 70%"); first-mover patterns ("the first accusation each round came from the same seat").
- Pick the highest-drama lines with a coded score; ties break by seeded RNG. Never more than two per morning.
- The file drops once, at morning, and stays pinned through discussion and accusation. No drip during phases.
- The audience sees the same file at the same time. Their predictions and the cast's discussion read the same evidence.
- Case files persist into the match archive and feed the recap.
- Anti-leak check belongs in the engine tests: a case-file generator run over a match's public log must produce identical output whether or not private state exists.

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
| Vote | Active cast | Set Arrest or Acquit |
| Frame | Active Mafia | Set legal night target |
| Scene action | Active cast | Play up to two day actions from the fixed deck |
| Alibi | Active Lawyer | Set legal alibi target |
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
