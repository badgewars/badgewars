# Courtroom interface

Design baseline accepted 2026-09-14. See [the interactive study](../design/courtroom.html) for phase and perspective examples. The study uses schematic portrait placeholders and invented conversation; it is not final art or real gameplay. Reviewer controls must never ship as player controls.

## Feel direction (added 2026-09-14)

The app shell adopts the feel of [apollo.cafe](https://apollo.cafe), built on the component base already proven in fibor (Next.js 15 App Router, Tailwind v4, shadcn/ui, framer-motion). Investigation of apollo's bundles showed its feel comes from the component layer, not its framework: motion (AnimatePresence enter/exit), hand-built selects and drawers on Radix, a three-font type system, and restrained oklch tokens.

Adopted from apollo:

- Dark-first zinc/oklch palette with a near-black background; light theme supported but secondary.
- One violet accent, used only for the ring, selection states, and active nav — never as large surfaces.
- Type trio: DM Sans Variable body, JetBrains Mono for numerals/timers (tabular, mono counts), a narrow industrial display face for brand and phase headings (Archivo stands in for apollo's commercial Halvar).
- Motion polish: 150–200ms enter/exit transitions on overlays, spotlights, and lists; standard easings; reduced-motion honored.
- Dense pill toolbars, 0.625rem radius, monochrome chrome where the content is the color.

Not adopted: apollo's card-grid explorer composition (the courtroom scene is our centerpiece), apollo's components themselves, and any commercial font.

The boot-screen landing (`/`) is a Render cold-start pastiche: short timestamped boot log, dashed ASCII banner, and a violet glitch grid. The grid is the future slot for the **24 member face cards** — placeholder glitch tiles now, member portraits once the manga art set exists (accepted 2026-09-14). The sequence auto-advances to the courtroom; it is a flourish, not a wait.

The chrome is dark; the illustrated courtroom scene keeps its warm manga-paper art direction inside the frame. The scene is content, like apollo's photocards.

## Experience

Conversation is the primary gameplay input. The courtroom shows state and makes choices visible. Manga portraits carry identity and drama. The user should always understand who is speaking, what phase is active, and whether they need to act.

Use a single persistent scene. Phase changes alter its focus, lighting, and action bar rather than sending players to different pages. Keep the cast in stable seat order so a familiar face remains easy to find.

## Desktop composition

At roughly 1440 pixels, allocate about 70% of the width to the courtroom and 30% to chat. Chat should stay near 340–400 pixels rather than grow with an ultrawide screen. Use the full application canvas for play; the owner's narrow-column landing-page default does not govern the accepted courtroom layout.

| Region | Contents | Behavior |
| --- | --- | --- |
| Header | Event, round, phase, remaining time, connection state | Always visible; no hidden-role counts |
| Courtroom | 24 seats with small portraits around a table | Stable identities; empty active seats remain recognizable after removal |
| Center | Selected member or automatic trial spotlight | Large portrait and public context; no automatic jump on every chat message |
| Gallery | Removed member portraits below the table | Still selectable, visibly unable to vote |
| Action bar | One phase-specific decision | Clear confirmation and acknowledged state |
| Chat | Match history; permitted tabs and composer | Independent scrolling and an explicit return-to-latest control |

Selecting a portrait opens public member history. It never submits an accusation. During a forced trial spotlight, another member's dossier opens in a side sheet so the accused remains visible. Closing the dossier restores the same scene and scroll position.

## Portrait behavior

Use one base manga portrait per member initially. The same asset serves a small seat, a message avatar, a large dossier, and a trial spotlight. Scale/crop assets rather than maintaining unrelated versions.

- Discussion: small portraits remain present; a thin speaking outline accompanies a message without stealing focus.
- Inspection: enlarge the selected member and show their public messages, accusations, and revealed ballots.
- Accusation: selection is private until the deadline; confirmation occurs in the action bar.
- Defense/verdict: automatically spotlight the accused; show their defense prominently.
- Night: dim the common scene; show legal targets and the chosen target only in the acting player's private view.
- Removal: remove the temporary game-badge marker and move the portrait into the gallery.
- Finale: reveal roles on the portraits and show team results.

Never color a real Mafia member differently before their permitted reveal. An expression, status icon, accessible label, notification, or animation must not disclose a secret. Distinguish the temporary game badge visually from collectible achievement art.

## Chat permissions

| Perspective | Match Chat | Audience Chat | Mafia Chat | Private role/results |
| --- | --- | --- | --- | --- |
| Active Citizen/Detective/Doctor | Read; write in allowed public phases | No access | No access | Own only |
| Active Mafia | Same public access | No access | Read/write at night | Own and teammates as permitted |
| Gallery | Read; write during public discussion | No access | No new messages | Previously known information only |
| Audience | Read only | Read/write | No access | Own predictions only |
| Public archive visitor | Published transcript only | Not published by default | Not published | Final revealed roles only |

Enforce this before serialization/subscription on the authority. Removing a tab or filtering received messages is not authorization. A cast account cannot switch to audience mode; perspective switching in the study is strictly a review aid. Private Mafia access should not be visible to other clients through presence events or tab metadata.

Each message displays member name, a stable player handle, time/phase, and a quote action. Gallery messages have a text label as well as muted styling. Preserve the scroll position while reading history and show a new-message count. Do not auto-scroll someone away from evidence they are reading.

Use plain text, bounded length, output escaping, server-enforced rate limits, and report/mute controls. Moderation state is an overlay on history; public replay follows the moderation policy instead of resurfacing removed material. No player-to-player direct messaging feature is needed.

## Action bar states

| Phase | Active ordinary seat | Special case | Audience |
| --- | --- | --- | --- |
| Discussion | Discuss; inspect histories | Gallery can also discuss | Inspect; make an open prediction |
| Accusation | Select member, confirm accusation, or abstain | Gallery has no action | Lock eligible prediction |
| Defense | Read defense | Accused gets defense composer | Read; lock prediction before verdict |
| Verdict | Remove badge / Spare | Gallery has no ballot | Read-only; predictions locked |
| Night | Review history | Attack / Protect / Investigate | Audience conversation; review history |
| Morning | Read public outcome | No new special action | Read outcome |
| Finale | Results and earned awards | Postgame award ballot | Prediction results and earned awards |

Every submission shows pending, accepted, or rejected state. Enable changes only where the rules permit them. A click that reaches the authority late must not appear successful. A repeated click must not submit twice. Reconnect must show the last acknowledged choice, not a stale local guess.

The private role card should open on demand, not remain exposed across a shared screen. Wallet approvals belong in onboarding/payment or an explicitly scoped authorization step; ordinary chat must not invoke wallet popups.

## Mobile

Below about 900 pixels, replace the two-column layout with one screen containing a compact stage and a tabbed lower panel. Keep the phase clock and action bar visible. Provide Court, Match, and permitted Audience navigation; Mafia is a private role-specific tab when available.

The Court view shows the trial spotlight or selected portrait, with the 24-seat roster in a scrollable grid/drawer. Keep an obvious Gallery entry and a count. Switching tabs must preserve message drafts, reading position, and current target.

At a 390-pixel viewport with the keyboard open, a player must still see who is on trial, the phase deadline, and the send/decision controls without horizontal scrolling. Respect safe areas, 44-pixel touch targets, keyboard focus, reduced motion, and non-color status labels. Announce phase transitions accessibly without reading every timer tick aloud.

## Art direction and asset scope

A restrained manga courtroom: warm paper, dark ink, muted wood, and a small brass accent for game badges. Night uses a cooler lighting treatment of the same scene. Chat remains light and high contrast; avoid placing text over detailed art. Use one accent for interaction and explicit labels for destructive choices.

Initial art scope: one reusable courtroom background, 24 transparent portraits in matching framing, one game-badge symbol, and one shared achievement frame. Badge-family illustrations follow the finalized catalogue. Add expression variants only after the layout proves readable.

Prepare a member manifest with stable IDs, verified names, portrait paths, crop/focal points, and alternative text. Keep presentation assets separate from roles. Record asset provenance and usage rights. Placeholder seat IDs in the study are not a verified roster manifest.

Reusable animations: spotlight fade, subtle portrait emphasis, verdict stamp, badge removal, gallery movement, and final role reveal. Keep them short, skippable, and reproducible from public events. No generated narrative or custom weekly animation is required.

## Archive

The leaderboard has ranking and past-match views. A match page contains result, cast, recap, highlights, and replay. Use the same courtroom renderer with published events, a timeline, play/pause, phase jumps, and playback speed. Seeking rebuilds state deterministically; do not approximate it by replaying arbitrary UI clicks.

Playback defaults to what the public knew at that point. Offer final roles as an explicitly labeled spoiler view after publication. Exclude private faction chat, Doctor/Detective targets, notebooks, and audience chat by default. Final roles and award eligibility can still be published without publishing every private action.

## Acceptance

A first-time viewer can identify the phase, accused member, current action, and their own audience/cast status without explanation. A full 24-seat board is readable at desktop and mobile sizes. Chat never overrides a chosen inspection. Trials and private night selections remain visually distinct. Controls stay usable through reconnects and keyboard opening.
