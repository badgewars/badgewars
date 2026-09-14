import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { fixtureRole, type Member, type Phase } from "./fixtures";

export function Seat({
  member,
  selected,
  phase,
  onClick,
  compact,
}: {
  member: Member;
  selected: boolean;
  phase: Phase;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${member.name}, ${member.removed ? "gallery" : "active"}`}
      onClick={onClick}
      className={cn(
        "group flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-transparent p-1 transition-colors hover:bg-accent/60 aria-pressed:border-ring aria-pressed:bg-ring/10",
        compact && "flex-row gap-2 p-2"
      )}
    >
      <span
        className={cn(
          "relative overflow-hidden rounded-md border border-border bg-gradient-to-br from-secondary to-card font-display font-semibold text-foreground transition-transform group-hover:scale-[1.04]",
          compact ? "h-8 w-7 text-xs" : "h-11 w-10 text-lg"
        )}
      >
        <img
          src={`/roster/s${String(member.seat + 1).padStart(2, "0")}.png`}
          alt=""
          className="absolute inset-0 h-full w-full rounded-[inherit] object-cover object-top"
        />
        {phase === "finale" && !member.removed && (
          <i className="font-mono absolute -right-1 -bottom-1 not-italic text-[7px] uppercase tracking-wide text-muted-foreground">
            {fixtureRole(member.seat).slice(0, 4)}
          </i>
        )}
        {!member.removed && (
          <BadgeCheck
            className="absolute -right-1.5 -bottom-1.5 size-3.5 rounded-full bg-card text-ring"
            aria-label="Game badge"
          />
        )}
      </span>
      <span
        className={cn(
          "max-w-full truncate text-[10px] leading-tight text-muted-foreground",
          member.removed && "line-through opacity-60"
        )}
      >
        {member.name}
      </span>
    </button>
  );
}
