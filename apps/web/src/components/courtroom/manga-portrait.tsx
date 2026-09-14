import { cn } from "@/lib/utils";

// Roster portraits are AI-generated realistic manga pieces restyled from the
// official photos (see design/roster/). They render as plain images — no CSS
// filter pass on top; night dimming and trial speed lines live in globals.css.

export function portraitSrc(seat: number): string {
  return `/roster/s${String(seat + 1).padStart(2, "0")}.png`;
}

export function MangaPortrait({
  seat,
  alt = "",
  tile = false,
  speedLines = false,
  className,
}: {
  seat: number;
  alt?: string;
  tile?: boolean;
  speedLines?: boolean;
  className?: string;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={portraitSrc(seat)}
        alt={alt}
        className={cn("manga-photo", tile && "manga-photo--tile", className)}
      />
      {speedLines && (
        <span aria-hidden="true" className="manga-speed pointer-events-none absolute inset-0" />
      )}
    </>
  );
}
