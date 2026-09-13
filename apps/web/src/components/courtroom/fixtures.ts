// Presentation fixtures only — no engine, transport, secrets, or real roster.
// Placeholder seat names on purpose: this shell is not a verified member manifest.

export const PHASES = [
  "discussion",
  "accusation",
  "defense",
  "verdict",
  "night",
  "morning",
  "finale",
] as const;

export type Phase = (typeof PHASES)[number];

export const PHASE_LABELS: Record<Phase, string> = {
  discussion: "Discussion",
  accusation: "Accusation",
  defense: "Defense",
  verdict: "Verdict",
  night: "Night",
  morning: "Morning",
  finale: "Final reveal",
};

export const PHASE_CLOCKS: Record<Phase, string> = {
  discussion: "03:00",
  accusation: "00:30",
  defense: "00:30",
  verdict: "00:30",
  night: "00:45",
  morning: "00:15",
  finale: "—",
};

export type SeatRole = "Citizen" | "Mafia" | "Detective" | "Lawyer";

export type Member = {
  seat: number;
  name: string;
  removed: boolean;
};

export const MEMBERS: Member[] = Array.from({ length: 24 }, (_, i) => ({
  seat: i,
  name: `Member ${String(i + 1).padStart(2, "0")}`,
  removed: [4, 11, 16, 21].includes(i),
}));

export const FIXTURE_MAFIA = new Set([0, 3, 10, 13, 18, 22]);

export function fixtureRole(seat: number): SeatRole {
  if (FIXTURE_MAFIA.has(seat)) return "Mafia";
  if (seat === 7) return "Detective";
  if (seat === 19) return "Lawyer";
  return "Citizen";
}

export type ChatMessage =
  | { kind: "event"; text: string }
  | { kind: "chat"; seat: number; text: string; time: string; gallery?: boolean };

export type Channel = "match" | "audience" | "mafia";

export const FIXTURE_CHATS: Record<Channel, ChatMessage[]> = {
  match: [
    { kind: "event", text: "Discussion opens. Roles remain hidden." },
    { kind: "chat", seat: 7, text: "You accused Member 03 yesterday. What changed?", time: "00:18" },
    {
      kind: "chat",
      seat: 6,
      text: "Her vote matched her explanation. I am more suspicious of the people who stayed quiet.",
      time: "00:27",
    },
    {
      kind: "chat",
      seat: 2,
      text: "Look at the first vote. I voted Acquit before anyone defended me.",
      time: "00:39",
    },
    { kind: "event", text: "Member 05 was arrested and taken to the gallery. Their public voice ends here." },
    { kind: "chat", seat: 13, text: "We need a clear reason before removing someone else.", time: "01:03" },
  ],
  audience: [
    { kind: "event", text: "Audience conversation is separate from the cast." },
    { kind: "chat", seat: -1, text: "Member 07 has an answer for everything. Saving my prediction until the defense.", time: "01:04" },
    { kind: "chat", seat: -1, text: "The change in voting is more interesting than who is talking the most.", time: "01:12" },
  ],
  mafia: [
    { kind: "event", text: "Private fixture channel · active Mafia only." },
    { kind: "chat", seat: -1, text: "Choose a target before the night timer closes.", time: "00:08" },
  ],
};
