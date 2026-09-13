# Achievement badges

**Direction:** earned NFT badges with edition copies for multiple recipients. **Status:** the following catalogue and exact conditions are a working proposal from the design discussion, not implemented awards.

## Catalogue

An eligible player is a human who meets the eventual participation policy. Bot actions must not automatically farm achievements for an absent account. Unless noted otherwise, awards settle after a valid match ends.

| Badge family | Proposed earning condition | Variants / settlement |
| --- | --- | --- |
| Member Debut | Complete active duty as a member without abandoning the seat | 24 member variants; postgame |
| Agent Victory | Finish on the winning Agent faction with eligible participation | Postgame; removal alone does not disqualify |
| Spy Victory | Finish on the winning Spy faction with eligible participation | Postgame; removal alone does not disqualify |
| Spycatcher | As an Agent, nominate a Spy, vote for that same Spy, and see them removed in that day's trial | Postgame; secret-dependent |
| Guardian Angel | Protect another Agent-faction seat against an actual Spy attack | Postgame; self-protection excluded |
| Case Builder | As Investigator, successfully inspect two distinct Spies | Postgame; secret-dependent |
| Great Escape | As a Spy, survive a formal trial and later win with the faction | Postgame |
| Last Word | As an Agent juror, cast a vote that changes the trial result to removal of a Spy | Postgame; counterfactual tally uses the same tie rules |
| Held Your Ground | Survive a formal trial while personally controlling the nominated seat | May celebrate publicly then; final award after valid completion |
| Perfect Operation | Win as Agents with no Agent-faction seat removed by a day ballot | Team achievement; postgame |
| Eye for Spies | Make correct locked audience predictions | Bronze: one; silver: two; gold: three |
| Players' Choice | Receive the most eligible human cast votes after the match | No self-votes; subjective recognition |
| Scene Stealer | Receive the most eligible audience performance votes after the match | Subjective recognition; not a gameplay advantage |
| Encore | Complete eligible active participation in multiple matches | Milestones at 5, 10, and 25 matches |
| Regular WAV | Submit valid audience predictions across different matches | Milestones at 5, 10, and 25 matches |
| Full Cast | Earn all 24 Member Debut variants | Collection achievement; check after new Debuts settle |

There are 16 families and **45 member/tier variants** if Debut has 24 variants and Eye for Spies, Encore, and Regular WAV each have three tiers. This does not require 45 unrelated illustrations; templates can share artwork.

Debut repeatability, team-award eligibility, minimum participation, award-vote quorum and ties, bot replacement attribution, and invalidated matches need final definitions. Preserve those open questions rather than letting mint code decide them accidentally.

## Audience prediction proposal

- Only eligible paid audience accounts participate; a cast or jury account cannot predict its own match.
- Offer one suspect choice in each of the first three rounds, before that round's ballot closes. Lock a submitted choice immediately.
- Require different suspects across the three choices. A target must be legal and active when selected; later removal does not erase a valid prediction.
- Do not allow retroactive picks for a missed window. Publish neither individual picks nor aggregate suspicion totals to players during the match.
- After the final reveal, count distinct correctly identified Spies. Award the highest earned Eye for Spies tier for that match. Zero correct earns no Eye for Spies badge.
- No immediate correctness feedback, secret-dependent score increments, or early mint transactions.

The example of 2,000 spectators with 1,000 correct guessers is a sizing scenario, not an expected accuracy rate. Actual recipients depend on these rules and observed play.

## Trigger, celebration, and settlement

These are separate moments. A public event such as surviving a trial can produce an immediate animation. Secret-dependent achievements must not become publicly observable before the final reveal, even through contract events or metadata. Settle all final eligibility from the completed match record.

Subjective awards should remain distinct from measured game achievements. Use one vote per eligible account and no payment or badge-balance weighting. Specify the voting window, ties, and quorum before awarding them.

One event must not mint the same entitlement twice. Repeat achievements should preserve the match in which each was earned, rather than only incrementing an unexplained total. Cancelled and invalid matches need a defined award policy.

## Proposed NFT model

Use ERC-1155 editions on Abstract as the starting recommendation: one artwork template can serve many copies of the same achievement. An event-specific token ID can identify the badge family, member or tier, and match. Lifetime milestones can use a separate lifetime identifier convention.

Each recipient still needs an onchain balance update. Shared art does not make 1,000 recipients cost the same as one. Standard ERC-1155 batch minting groups multiple token IDs for one recipient; distribution to many wallets needs an additional implementation.

ERC-1155 copies of an ID are not individually serialized. If numbered prints are essential, choose a representation that actually gives each copy its own identity; do not promise serial numbers this model does not supply.

The recommendation is for earned achievements to stay attached to their earner, with the operator sponsoring award gas. **Transferability and sponsorship are not final decisions.** Do not silently hard-code nontransferability or require a second fee to receive an earned badge.

"Inscribed" is unresolved terminology here. It could mean an onchain NFT pointing to stored artwork, or the artwork and metadata themselves being onchain. Compact onchain SVG is the current recommendation for durable badges; it is not a commitment to Bitcoin Ordinals or a finished art direction. See [RESEARCH.md](RESEARCH.md) for the cost snapshot and its limits.

NFT ownership alone is not proof of earning if transfers are allowed. Keep award provenance available to leaderboard calculations. An achievement does not promise monetary value, official Cosmo recognition, or a right to use member photography.
