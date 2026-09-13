"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MEMBERS, PHASE_LABELS, type Member, type Phase } from "./fixtures";

export function Spotlight({
  member,
  phase,
  onOpenHistory,
}: {
  member: Member;
  phase: Phase;
  onOpenHistory: (seat: number) => void;
}) {
  const forced = phase === "defense" || phase === "verdict";
  const label = phase === "finale" ? "Final reveal" : forced ? "On trial" : phase === "night" ? "Your private selection" : "Selected member";

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.article
        key={`${phase}-${member.seat}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
        className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-card/80 px-6 py-5 text-center shadow-sm"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <div className="flex h-24 w-20 items-center justify-center rounded-lg border border-border bg-gradient-to-br from-secondary to-card shadow-[4px_4px_0_0] shadow-border/60">
          <b className="font-display text-5xl font-bold">{member.name.replace(/^Member /, "").slice(0, 2)}</b>
        </div>
        <h1 className="font-display mt-2 text-2xl font-semibold">{member.name}</h1>
        <p className="max-w-[290px] text-xs text-muted-foreground">
          {phase === "finale"
            ? "Roles are revealed on every seat."
            : forced
              ? "“Read my first vote. I have been consistent.”"
              : phase === "night"
                ? "Only your own view shows this selection."
                : "Active · role unknown"}
        </p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => onOpenHistory(member.seat)}>
          Public history
        </Button>
        <span className="sr-only">
          {PHASE_LABELS[phase]} · {MEMBERS.length} members
        </span>
      </motion.article>
    </AnimatePresence>
  );
}
