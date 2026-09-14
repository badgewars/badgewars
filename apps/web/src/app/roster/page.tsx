import { BadgeCheck } from "lucide-react";
import { MEMBERS } from "@/components/courtroom/fixtures";
import { MangaPortrait } from "@/components/courtroom/manga-portrait";

export const metadata = {
  title: "Roster · Badge Wars",
  description: "The 24 seats of the courtroom.",
};

export default function Roster() {
  return (
    <main className="min-h-dvh bg-background px-6 py-10 text-foreground">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        badge<span className="text-ring">wars</span>
      </h1>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        The 24 seats of the courtroom — the official tripleS roster in seat order
        (S1–S24). Manga-style treatment over the official promotional photos: the
        members&rsquo; exact likenesses, inked. Photos are fan art; provenance recorded
        in the member manifest. Before any commercial launch this usage needs
        MODHAUS authorization — the pitch is the plan.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {MEMBERS.map((m) => (
          <article
            key={m.seat}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="relative">
              <MangaPortrait
                tile
                seat={m.seat}
                alt={`Manga-treated portrait of ${m.name}, seat ${m.seat + 1}`}
                className="aspect-square w-full object-cover object-top"
              />
              <BadgeCheck
                className="absolute right-2 bottom-2 size-5 rounded-full bg-card text-ring"
                aria-label="Game badge"
              />
            </div>
            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="text-[13px] font-semibold">{m.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                S{String(m.seat + 1).padStart(2, "0")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
