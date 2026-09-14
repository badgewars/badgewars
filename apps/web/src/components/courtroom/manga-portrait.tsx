import { cn } from "@/lib/utils";

// Manga treatment: CSS-only hybrid portraits.
// The official photos stay underneath unchanged; a shared SVG filter set
// posterizes tones, tints them toward warm manga paper, and inks the edges.
// No face is synthesized — this keeps the docs/UI.md verdict (official
// photography, likeness preserved) while matching the manga art direction.

export function portraitSrc(seat: number): string {
  return `/roster/s${String(seat + 1).padStart(2, "0")}.png`;
}

// Full treatment: grayscale → inky levels → posterize → warm paper tint →
// laplacian edge response rendered as black ink lines.
function InkFilter({ id, warm }: { id: string; warm: boolean }) {
  const tint = warm
    ? "0.94 0 0 0 0.02  0 0.9 0 0 0.016  0 0 0.84 0 0.02  0 0 0 1 0"
    : "0.8 0 0 0 0.012  0 0.9 0 0 0.02  0 0 1.02 0 0.05  0 0 0 1 0";
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
      <feColorMatrix type="saturate" values="0" result="gray" />
      <feComponentTransfer in="gray" result="leveled">
        <feFuncR type="gamma" amplitude="1" exponent="1.3" offset="0" />
        <feFuncG type="gamma" amplitude="1" exponent="1.3" offset="0" />
        <feFuncB type="gamma" amplitude="1" exponent="1.3" offset="0" />
        <feFuncA type="identity" />
      </feComponentTransfer>
      <feComponentTransfer in="leveled" result="posterized">
        <feFuncR type="discrete" tableValues="0.08 0.3 0.54 0.78 0.98" />
        <feFuncG type="discrete" tableValues="0.08 0.3 0.54 0.78 0.98" />
        <feFuncB type="discrete" tableValues="0.08 0.3 0.54 0.78 0.98" />
        <feFuncA type="identity" />
      </feComponentTransfer>
      <feColorMatrix in="posterized" type="matrix" values={tint} result="tinted" />
      <feGaussianBlur in="gray" stdDeviation="0.6" result="smooth" />
      <feConvolveMatrix
        in="smooth"
        order="3"
        divisor="1"
        edgeMode="duplicate"
        preserveAlpha="true"
        kernelMatrix="0 1 0 1 -4 1 0 1 0"
        result="lap"
      />
      <feColorMatrix
        in="lap"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.1 1.1 1.1 0 -0.04"
        result="ink"
      />
      <feComposite in="ink" in2="tinted" operator="over" />
    </filter>
  );
}

// Tile treatment: same tones without edge ink — lines vanish at chip sizes,
// and skipping the convolution keeps 24 tiny portraits cheap.
function TileFilter({ id, warm }: { id: string; warm: boolean }) {
  const tint = warm
    ? "0.94 0 0 0 0.02  0 0.9 0 0 0.016  0 0 0.84 0 0.02  0 0 0 1 0"
    : "0.8 0 0 0 0.012  0 0.9 0 0 0.02  0 0 1.02 0 0.05  0 0 0 1 0";
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
      <feColorMatrix type="saturate" values="0" result="gray" />
      <feComponentTransfer in="gray" result="leveled">
        <feFuncR type="gamma" amplitude="1" exponent="1.3" offset="0" />
        <feFuncG type="gamma" amplitude="1" exponent="1.3" offset="0" />
        <feFuncB type="gamma" amplitude="1" exponent="1.3" offset="0" />
        <feFuncA type="identity" />
      </feComponentTransfer>
      <feComponentTransfer in="leveled" result="posterized">
        <feFuncR type="discrete" tableValues="0.1 0.34 0.62 0.95" />
        <feFuncG type="discrete" tableValues="0.1 0.34 0.62 0.95" />
        <feFuncB type="discrete" tableValues="0.1 0.34 0.62 0.95" />
        <feFuncA type="identity" />
      </feComponentTransfer>
      <feColorMatrix in="posterized" type="matrix" values={tint} />
    </filter>
  );
}

// Mount once (root layout). Referenced from CSS via filter: url(#…).
export function MangaFilters() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0">
      <defs>
        <InkFilter id="bw-manga" warm />
        <InkFilter id="bw-manga-cool" warm={false} />
        <TileFilter id="bw-manga-soft" warm />
        <TileFilter id="bw-manga-soft-cool" warm={false} />
      </defs>
    </svg>
  );
}

// Drop-in portrait: the filtered photo plus a halftone/paper overlay span.
// The parent must be positioned and clipped (rounded + overflow-hidden);
// siblings rendered after (badge, role tag) stay above the overlay.
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
      <span
        aria-hidden="true"
        className={cn("manga-overlay pointer-events-none absolute inset-0", speedLines && "manga-speed")}
      />
    </>
  );
}
