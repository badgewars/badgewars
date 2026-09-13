# Achievement badges

Direction: earned NFT editions for multiple recipients. Updated 2026-09-14 for Mafia/Citizen terminology and the non-voting gallery. Conditions remain proposals until implementation and playtesting.

## Catalogue

| Family | Earning condition | Variants / settlement |
| --- | --- | --- |
| Member Debut | Complete active duty as a member without abandoning the seat | 24 member variants; postgame |
| Citizen Victory | Win with the Citizen faction with eligible participation | Postgame; removal alone does not disqualify |
| Mafia Victory | Win with the Mafia faction with eligible participation | Postgame; removal alone does not disqualify |
| Mafia Hunter | As a Citizen, accuse Mafia, vote Remove in their trial, and see them removed that day | Postgame |
| Lifesaver | As Doctor, protect another Citizen-faction seat against an actual attack | Postgame; self-protection excluded |
| Case Builder | As Detective, inspect two distinct Mafia members | Postgame |
| Great Escape | As Mafia, survive trial and later win with the faction | Postgame |
| Held Your Ground | Survive trial while personally controlling the accused seat | Public celebration allowed; final award postgame |
| Perfect Operation | Win as Citizens with no Citizen-faction seat removed by a day verdict | Team achievement; postgame |
| Sharp Eye | Correct locked audience predictions | Bronze: one; silver: two; gold: three |
| Players' Choice | Most eligible human cast votes after the match | No self-votes; subjective recognition |
| Scene Stealer | Most eligible audience performance votes after the match | Subjective recognition |
| Encore | Complete eligible active participation across matches | 5, 10, and 25 matches |
| Regular WAV | Submit valid predictions across different matches | 5, 10, and 25 matches |
| Full Cast | Earn all 24 Member Debut variants | Collection achievement |

The revised catalogue has 15 families and 44 member/tier variants: 24 Debuts, nine variants across Sharp Eye/Encore/Regular WAV, and 11 others. Templates can share art. The former Last Word proposal depended on a jury ballot and is retired with that rule. No existing tokens are affected; none have been issued.

## Audience prediction proposal

Eligible paid audience accounts may lock one suspect in each of the first three rounds. Targets must be distinct and active when selected. Lock before verdict starts; if a trial is skipped, lock at accusation close. No revisions or retroactive guesses.

After final reveal, count distinct correct Mafia guesses and award the highest earned Sharp Eye tier. Zero correct earns none. Cast and gallery accounts cannot predict their own match. Other accounts' picks, totals, and correctness remain private until finalization.

Three windows are a starting proposal. Test whether the audience remains engaged after round three; NFTs do not establish that. Do not address boredom by selling extra guesses.

## Integrity and delivery

Separate trigger, celebration, and settlement. Public trial survival can animate immediately. Secret-dependent awards must produce no observable event, score increment, metadata change, or notification before final reveal.

Derive entitlements from completed facts. Deduplicate by earning account, achievement variant, and match or lifetime milestone. Retry transaction delivery without re-awarding. Preserve match provenance for repeat achievements and leaderboard calculations.

Finalize human participation, partly automated seats, team eligibility, repeated Debuts, and invalid-match policy before awards go live. Bots must not farm rewards for absent accounts. Subjective awards need deadlines, quorum, and tie rules; rank them separately from objective gameplay.

## Edition recommendation

Start with ERC-1155 on Abstract. An event-specific ID describes family, member/tier, and match; lifetime milestones use a distinct convention. Each recipient still needs a balance update. Standard ERC-1155 batch minting groups IDs for one recipient, not arbitrary many-wallet distribution. Copies of one ID do not carry unique serial numbers.

Current recommendation: achievements remain attached to their earners and the operator sponsors issuance. Transferability and sponsorship need final decisions before deployment. Do not add an unexpected second fee to receive an achievement.

The meaning of "inscribed" remains unresolved. Compact onchain SVG and immutable metadata are the durability recommendation; Bitcoin inscriptions are a different chain/cost model. [RESEARCH.md](RESEARCH.md) preserves the dated estimate from before this catalogue changed from 45 to 44 variants.

If transferability is allowed, ownership alone cannot establish earning. Leaderboards follow award provenance. No resale value, official Cosmo recognition, or commercial image license is implied.
