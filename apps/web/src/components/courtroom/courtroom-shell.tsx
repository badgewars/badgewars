"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ActionBar } from "./action-bar";
import { ChatPanel } from "./chat-panel";
import {
  MEMBERS,
  PHASES,
  PHASE_CLOCKS,
  PHASE_LABELS,
  type Phase,
  type SeatRole,
} from "./fixtures";
import { Seat } from "./seat";
import { Spotlight } from "./spotlight";

const TOP = [0, 1, 2, 3, 4, 5, 6, 7];
const LEFT = [8, 9, 10, 11];
const RIGHT = [12, 13, 14, 15];
const BOTTOM = [16, 17, 18, 19, 20, 21, 22, 23];

// The floor + gallery group is ~620px tall and 900px wide at design size. On
// desktop, zoom it by the space actually available so the full table always
// fits (grows on tall windows up to a readable cap, shrinks on short ones)
// without page scroll. Mobile keeps zoom 1 and scrolls the compact roster.
const COURT_GROUP_NATURAL_H = 620;
const COURT_GROUP_NATURAL_W = 900;
const COURT_GROUP_CHROME_PX = 280;

function useCourtZoom(enabled: boolean) {
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    if (!enabled) return;
    const compute = () => {
      const arena = document.querySelector<HTMLElement>(".courtroom-arena");
      const byHeight = (window.innerHeight - COURT_GROUP_CHROME_PX) / COURT_GROUP_NATURAL_H;
      const byWidth = ((arena?.clientWidth ?? COURT_GROUP_NATURAL_W) - 24) / COURT_GROUP_NATURAL_W;
      setZoom(Math.max(0.4, Math.min(1.45, byHeight, byWidth)));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [enabled]);
  return enabled ? zoom : 1;
}

export function CourtroomShell() {
  const [phase, setPhase] = useState<Phase>("discussion");
  const [role, setRole] = useState<SeatRole | "Audience">("Citizen");
  const [selected, setSelected] = useState(6);
  const [choice, setChoice] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const forcedTrial = phase === "defense" || phase === "verdict";
  const focus = MEMBERS[forcedTrial ? 6 : selected];
  const activeCount = MEMBERS.filter((m) => !m.removed).length;

  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const courtZoom = useCourtZoom(isDesktop);

  const choose = (label: string) => setChoice(label);

  const arena = (
    <section
      aria-label="Courtroom"
      className="courtroom-arena flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-xl border border-border bg-gradient-to-br from-card/60 to-background p-4 md:overflow-hidden"
    >
      <div className="flex justify-between text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>24 members · one table</span>
        <span>{activeCount} active / {MEMBERS.length - activeCount} gallery</span>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center md:overflow-hidden">
        <div
          className="shrink-0"
          style={isDesktop ? { zoom: courtZoom, width: COURT_GROUP_NATURAL_W } : undefined}
        >
      <div className="grid grid-cols-[84px_minmax(0,1fr)_84px] grid-rows-[auto_minmax(220px,auto)_auto] gap-3 rounded-xl border border-border/60 bg-gradient-to-br from-secondary/40 to-card/60 p-4 max-md:grid-cols-1 max-md:grid-rows-none">
        <div className="col-span-full grid grid-cols-8 gap-2 max-md:col-span-1 max-md:hidden">
          {TOP.map((s) => (
            <Seat key={s} member={MEMBERS[s]} phase={phase} selected={!forcedTrial && selected === s} onClick={() => setSelected(s)} />
          ))}
        </div>
        <div className="grid gap-2 max-md:hidden">
          {LEFT.map((s) => (
            <Seat key={s} member={MEMBERS[s]} phase={phase} selected={!forcedTrial && selected === s} onClick={() => setSelected(s)} />
          ))}
        </div>
        <Spotlight member={focus} phase={phase} onOpenHistory={() => setHistoryOpen(true)} />
        <div className="grid gap-2 max-md:hidden">
          {RIGHT.map((s) => (
            <Seat key={s} member={MEMBERS[s]} phase={phase} selected={!forcedTrial && selected === s} onClick={() => setSelected(s)} />
          ))}
        </div>
        <div className="col-span-full grid grid-cols-8 gap-2 max-md:col-span-1 max-md:hidden">
          {BOTTOM.map((s) => (
            <Seat key={s} member={MEMBERS[s]} phase={phase} selected={!forcedTrial && selected === s} onClick={() => setSelected(s)} />
          ))}
        </div>

        {/* Compact roster grid for small screens. */}
        <div className="col-span-full grid grid-cols-4 gap-2 md:hidden">
          {MEMBERS.map((m) => (
            <Seat key={m.seat} member={m} phase={phase} compact selected={!forcedTrial && selected === m.seat} onClick={() => setSelected(m.seat)} />
          ))}
        </div>
      </div>

        <div className="flex items-center gap-3 pt-4">
          <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
            Gallery
            <br />
            No vote
          </span>
          <div className="flex flex-1 gap-2 overflow-x-auto">
            {MEMBERS.filter((m) => m.removed).map((m) => (
              <Seat key={m.seat} member={m} compact phase={phase} selected={selected === m.seat} onClick={() => setSelected(m.seat)} />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );

  const actionBar = (
    <ActionBar phase={phase} selected={selected} role={role} choice={choice} onChoice={choose} />
  );

  return (
    <div data-phase={phase} className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <header className="flex items-center gap-5 border-b border-border bg-card/60 px-6 py-3">
        <div className="font-display text-xl font-bold tracking-tight">
          badge<span className="text-ring">wars</span>
        </div>
        <div className="mr-auto hidden text-[11px] leading-tight text-muted-foreground sm:block">
          The courtroom
          <br />
          Fixture match · Round 3
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className={cn("font-display text-sm font-semibold tracking-wide uppercase")}>{PHASE_LABELS[phase]}</div>
          <div className="border-l border-border pl-4 font-mono text-lg tabular-nums">{PHASE_CLOCKS[phase]}</div>
        </div>
      </header>

      {process.env.NODE_ENV === "development" && (
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-1.5 text-[11px]">
          <strong className="mr-auto text-muted-foreground uppercase">Fixture controls · not player UI</strong>
          <Select value={phase} onValueChange={(v) => { setPhase(v as Phase); setChoice(null); }}>
            <SelectTrigger size="sm" className="w-32" aria-label="Fixture phase">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PHASES.map((p) => (
                <SelectItem key={p} value={p}>
                  {PHASE_LABELS[p]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={role} onValueChange={(v) => setRole(v as SeatRole | "Audience")}>
            <SelectTrigger size="sm" className="w-32" aria-label="Fixture role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(["Citizen", "Mafia", "Detective", "Lawyer", "Audience"] as const).map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const next = PHASES[(PHASES.indexOf(phase) + 1) % PHASES.length];
              setPhase(next);
              setChoice(null);
            }}
          >
            Next phase →
          </Button>
        </div>
      )}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden max-lg:grid-rows-[1fr_auto] lg:grid-cols-[minmax(0,1fr)_360px] lg:grid-rows-[minmax(0,1fr)_auto]"
      >
        <div className="min-h-0 overflow-hidden lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col">
          <Tabs defaultValue="court" className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden">
            <TabsList className="justify-start rounded-none border-b border-border bg-card/40 px-4 py-0 md:hidden">
              <TabsTrigger value="court">Court</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="court" className="mt-0 min-h-0 flex-1 overflow-hidden">
              <div className="flex h-full min-h-0 flex-col overflow-hidden p-3">
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{arena}</div>
              </div>
            </TabsContent>
            <TabsContent value="chat" className="mt-0 min-h-0 flex-1 overflow-hidden border-l-0">
              <div className="h-full overflow-hidden md:hidden">
                <ChatPanel phase={phase} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="hidden lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:min-h-0 lg:flex-col">
          <ChatPanel phase={phase} />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">{actionBar}</div>
      </motion.main>

      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Public member history</DialogTitle>
            <DialogDescription>
              Sample record: {focus.name} voted Spare in round 2. Accusations and locked ballots appear
              here after their public reveal. No private roles or targets belong in this view.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setHistoryOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
