# Research snapshot

Captured from the project discussion on 2026-09-13/14. These are dated observations and design inputs. Recheck live infrastructure, addresses, fee conditions, and provider support before implementation. No production Badge Wars transactions were sent, and no contracts or NFTs were deployed as part of this research.

## Cosmo and the chain

The earlier Polygon description of Objekts is historical. Abstract's July 2025 announcement describes its partnership with MODHAUS for tripleS, ARTMS, and idntt. Abstract is the working chain choice for this project. [Official announcement](https://www.prnewswire.com/news-releases/abstract-partners-with-k-pop-innovator-modhaus-to-power-fan-engagement-for-triples-artms-and-idntt-reaching-over-600-million-monthly-views-302497741.html)

| Item | Research snapshot |
| --- | --- |
| Network | Abstract mainnet, an Ethereum L2 using the ZK stack |
| Chain ID | `2741` |
| Gas asset | ETH |
| RPC | `https://api.mainnet.abs.xyz` |
| Observed Objekt contract | `0x99bb83ae9bb0c0a6be865cacf67760947f91cb70` |
| Observed Pyth Entropy deployment | `0x5a4a369f4db5df2054994af031b7b23949b98c0e` |

Network configuration: [Abstract connection documentation](https://docs.abs.xyz/connect-to-abstract). Architecture: [Abstract L2 documentation](https://docs.abs.xyz/how-abstract-works/architecture/layer-2s).

The observed Objekt contract returned the collection name `Objekt`. Token 1 pointed to [Cosmo metadata](https://api.cosmo.fans/bff/v3/objekts/nft-metadata/1), identifying Atom01 JiWoo 100Z #1. This is collection evidence, not proof that a given game user can sign for their Cosmo account.

A community-maintained [Objekt ABI](https://github.com/teamreflex/cosmo-web/blob/main/apps/indexer/abi/objekt.json) includes transferability controls and an external-transfer error. Treat it as an implementation clue, not official authorization or a complete integration specification. Same-chain deployment does not mean arbitrary custody, transfers, or reuse of Cosmo assets is available.

[Abstract Global Wallet](https://docs.abs.xyz/abstract-global-wallet/overview) provides onboarding options, but an AGW account is not automatically a linked Cosmo or Kimchi identity.

## Randomness and secrets

[Pyth Entropy](https://docs.pyth.network/entropy) and the [Entropy explorer](https://entropy-explorer.pyth.network/) were checked as a possible Abstract draw source. No provider has been integrated or selected irrevocably.

A fair draw also needs a frozen eligible list, a published derivation of cast and standbys, and no discretionary rerolls. Randomness cannot establish that each wallet belongs to a different person.

Public randomness is appropriate for public cast selection. Secret-role assignment needs a separate privacy design. Solidity storage marked `private` remains observable outside the contract. [Solidity visibility documentation](https://docs.solidity.org/en/latest/contracts.html#visibility-and-getters)

## NFT edition mechanics

ERC-1155 supports multiple copies under the same token ID. It does not give each copy a separate serial number, and its standard batch mint operation groups token IDs for a recipient rather than providing an arbitrary many-recipient airdrop. [ERC-1155 standard](https://eips.ethereum.org/EIPS/eip-1155), [OpenZeppelin ERC-1155 documentation](https://docs.openzeppelin.com/contracts/5.x/erc1155)

There is no universal network surcharge for a "1/1." Storage and execution determine fees. Sharing artwork is possible across different NFT designs; editions are a product/data-model choice as well as a cost choice.

## Indicative award delivery cost

Read-only observations around Abstract block `83,585,278`, timestamp `2026-09-13T19:00:07Z`:

- Gas price: approximately `0.04525 gwei`.
- ETH conversion used: approximately `$2,509`, from the [Coinbase ETH-USD spot endpoint](https://api.coinbase.com/v2/prices/ETH-USD/spot).
- Two observed transactions containing ERC-1155 mints used approximately 148,140 and 156,304 gas. Their total transaction fees were approximately `$0.0168` and `$0.0177` at that conversion.

Evidence: [observed transaction A](https://abscan.org/tx/0x8aae26b9d48cf10e67304f61b55049be74f6b2e78a12f67f60ce48d9897b4785), [observed transaction B](https://abscan.org/tx/0x440cf326bfd8c65bcecc22cd6934aa89ae3966d7ff628da18a28477f5834d1fa).

These are other contracts, not a Badge Wars benchmark. Scaling their full transaction fees as one comparable transaction per recipient gives the following illustration:

| Award deliveries | Indicative total |
| ---: | ---: |
| 1,000 | $16.82–$17.75 |
| 1,100 | $18.50–$19.52 |
| 2,000 | $33.64–$35.50 |
| 3,000 | $50.46–$53.24 |

The discussed provisional budget was roughly **$20–$30 per 1,000 badge deliveries** at similar conditions. This is not a fee ceiling. The final contract, recipients, smart-wallet hooks, fee market, batching, and ETH price can change the result. An observed transaction with several mint events was not a benchmark for 1,000 distinct recipients.

For 2,000 audience members of whom 1,000 earn a prediction badge, shared artwork still leaves 1,000 recipient balances to update. Player badges and other awards add deliveries. Payment processing, hosting, moderation, art production, contract development, audits, and deployment are excluded from the table.

## Artwork stored onchain

A read-only `eth_estimateGas` simulation tested storing differently sized strings through an existing contract's `setContractURI(string)` method. It used synthetic payloads, not finished badge SVGs or Badge Wars contract code. The estimates are not actual transaction receipts or proof of a specific final design's cost.

At approximately `0.04525 gwei` and `$2,508.815/ETH`:

| Encoded payload | Estimated gas | Indicative fee |
| ---: | ---: | ---: |
| 64 bytes | 188,120 | $0.021 |
| 4 KiB | 1,172,214 | $0.133 |
| 16 KiB | 4,176,784 | $0.474 |
| 64 KiB | 16,205,861 | $1.840 |

On those assumptions, storing 16 compact designs of 4–16 KiB is roughly $2.13–$7.59; 45 separately stored variants roughly $5.99–$21.34. These are one-time payload-storage illustrations, additional to deployment and recipient mint costs. Reusing templates may reduce duplication. Large raster portraits, full metadata encoding, and final renderer logic require their own measurements.

L2 fees depend on execution and data-related costs, so implementation estimates must use the target network rather than a generic Ethereum gas assumption. [ZKsync fee structure](https://docs.zksync.io/zksync-protocol/era-vm/transactions/fee-model/fee-structure)

The working recommendation is compact onchain SVG for achievement art if it meets the desired appearance. IPFS is another option, but content addressing does not guarantee continued hosting; someone must preserve availability. [IPFS persistence](https://docs.ipfs.tech/concepts/persistence/)

"Inscribed" has not been resolved into a technical requirement. Bitcoin inscriptions are a different chain and cost model from the Abstract edition proposal.

## Product and launch dependencies

- Member images, show branding, and commercial usage rights have not been granted by this research. Review applicable rights and [Cosmo terms](https://static.cosmo.fans/pages/terms.html) for the actual asset/integration plan.
- No wagering or prize pool is the intended product. Whether a paid random seat allocation with collectible rewards needs additional legal treatment depends on the final design and jurisdictions; no legal clearance is claimed here.
- Any fee or audience conversion estimate remains a hypothesis until tested. Community membership is not equivalent to recurring paid demand.
