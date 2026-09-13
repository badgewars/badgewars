"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Mimic of Render's free-tier cold-start loading page: timestamped boot log,
// dashed ASCII banner, and a decorative glitch grid. Fixed to one viewport.
const BOOT_LINES = [
  "INCOMING HTTP REQUEST DETECTED ...",
  "SERVICE WAKING UP ...",
  "SEATING THE 24 MEMBERS ...",
  "SHUFFLING SECRET ROLES ...",
  "DEALING GAME BADGES ...",
  "OPENING MATCH CHAT ...",
  "LIGHTING THE COURTROOM ...",
] as const;

const BANNER = String.raw`
 ____    _    ____   ____ _____  __        ___    ____  ____
| __ )  / \  |  _ \ / ___| ____| \ \      / / \  |  _ \/ ___|
|  _ \ / _ \ | | | | |  _|  _|    \ \ /\ / / _ \ | |_) \___ \
| |_) / ___ \| |_| | |_| | |___    \ V  V / ___ \|  _ < ___) |
|____/_/   \_\____/ \____|_____|    \_/\_/_/   \_\_| \_\____/
`;

const GRID_COLS = 7;
const GRID_ROWS = 7;
const TILE_COUNT = GRID_COLS * GRID_ROWS;

type Bars = { top: number; width: number; hue: "white" | "pink" }[];

function makeBars(): Bars {
  const n = 2 + Math.floor(Math.random() * 3);
  return Array.from({ length: n }, () => ({
    top: Math.floor(Math.random() * 80),
    width: 25 + Math.random() * 55,
    hue: Math.random() < 0.22 ? "pink" : "white",
  }));
}

export function BootScreen() {
  const router = useRouter();
  const [lineCount, setLineCount] = useState(0);
  const [start, setStart] = useState<Date | null>(null);
  const [tiles, setTiles] = useState<(Bars | null)[]>(() =>
    Array(TILE_COUNT).fill(null)
  );
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStart(new Date());
    // Seed the grid post-mount so server and client markup agree.
    setTiles(Array.from({ length: TILE_COUNT }, (_, i) => (i % 5 === 0 ? makeBars() : null)));
  }, []);

  // Boot log: one line every ~1.4–2.2s.
  useEffect(() => {
    if (lineCount >= BOOT_LINES.length) return;
    const t = setTimeout(
      () => setLineCount((c) => c + 1),
      reduced.current ? 50 : 1400 + Math.random() * 800
    );
    return () => clearTimeout(t);
  }, [lineCount]);

  // Glitch grid: keep flipping a few tiles.
  useEffect(() => {
    if (reduced.current) return;
    const iv = setInterval(() => {
      setTiles((prev) => {
        const next = [...prev];
        const i = Math.floor(Math.random() * TILE_COUNT);
        next[i] = next[i] === null ? makeBars() : Math.random() < 0.25 ? null : next[i];
        return next;
      });
    }, 280);
    return () => clearInterval(iv);
  }, []);

  const done = lineCount >= BOOT_LINES.length;
  const stamp = (offsetSec: number) => {
    if (!start) return "--:--:--";
    const d = new Date(start.getTime() + offsetSec * 1000);
    return d.toTimeString().slice(0, 8);
  };

  return (
    <main className="relative flex h-dvh overflow-hidden bg-[#0a0a0a] font-mono text-neutral-200">
      <div className="z-10 flex w-full flex-col overflow-y-auto px-8 py-8 sm:px-16 sm:py-10 lg:w-[58%] lg:overflow-hidden">
        <div className="font-display text-2xl font-bold tracking-tight text-white">
          badge<span className="text-violet-500">wars</span>
        </div>

        <div className="mt-10 space-y-6 text-[13px] leading-loose sm:text-sm">
          {BOOT_LINES.slice(0, 2).map((l, i) => (
            <p key={l} className="whitespace-pre">
              <span suppressHydrationWarning className="text-neutral-500">{stamp(i * 3)} </span>
              {l}
            </p>
          ))}

          {lineCount >= 2 && (
            <pre
              aria-label="Badge Wars"
              className="my-6 border border-dashed border-neutral-500 px-6 py-4 text-[9px] leading-[1.25] text-neutral-300 sm:text-[11px] lg:text-xs"
            >
              {BANNER}
            </pre>
          )}

          {BOOT_LINES.slice(2, lineCount).map((l, i) => (
            <p key={l} className="whitespace-pre">
              <span suppressHydrationWarning className="text-neutral-500">{stamp((i + 2) * 3 + 4)} </span>
              {l}
            </p>
          ))}

          {done && (
            <div className="animate-in fade-in pt-4 duration-500">
              <p className="text-neutral-500"><span suppressHydrationWarning>{stamp(40)}</span> COURTROOM READY.</p>
              <Button
                onClick={() => router.push("/court")}
                className="mt-4 border border-neutral-400 bg-transparent font-mono text-xs tracking-widest text-neutral-100 uppercase hover:bg-violet-600 hover:text-white"
                variant="outline"
              >
                [ Enter the courtroom ]
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-[44%] grid-cols-7 grid-rows-7 lg:grid"
      >
        {tiles.map((bars, i) => (
          <div
            key={i}
            className="relative border-[0.5px] border-[#1d1d1d] transition-colors duration-300"
            style={bars ? { background: "#7c3aed" } : undefined}
          >
            {bars &&
              bars.map((b, j) => (
                <span
                  key={j}
                  className="absolute block h-[4px]"
                  style={{
                    top: `${b.top}%`,
                    left: "12%",
                    width: `${b.width}%`,
                    background: b.hue === "pink" ? "#f0abfc" : "#ffffff",
                  }}
                />
              ))}
          </div>
        ))}
      </div>
    </main>
  );
}
