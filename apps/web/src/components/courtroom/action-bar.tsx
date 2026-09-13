"use client";

import { Button } from "@/components/ui/button";
import { MEMBERS, type Phase, type SeatRole } from "./fixtures";

export function ActionBar({
  phase,
  selected,
  role,
  choice,
  onChoice,
}: {
  phase: Phase;
  selected: number;
  role: SeatRole | "Audience";
  choice: string | null;
  onChoice: (label: string) => void;
}) {
  const target = MEMBERS[selected];
  const targetable = !target.removed && selected !== 7;

  switch (phase) {
    case "discussion":
      return (
        <Action title="Read the room." hint="Select a portrait to inspect public history.">
          <Button variant="outline" onClick={() => onChoice("history")}>
            Inspect {target.name}
          </Button>
        </Action>
      );
    case "accusation":
      return (
        <Action
          title="Choose one member to accuse."
          hint={choice ? "Choice accepted; changes are allowed until the deadline." : "Your accusation is hidden until the deadline."}
        >
          <Button disabled={!targetable} onClick={() => onChoice(`Accuse ${target.name}`)}>
            Accuse {target.name}
          </Button>
          <Button variant="outline" onClick={() => onChoice("Abstain")}>
            Abstain
          </Button>
        </Action>
      );
    case "defense":
      return (
        <Action
          title="Hear the defense."
          hint="Only the accused may write during this phase."
        />
      );
    case "verdict":
      return (
        <Action
          title={`${target.name} is on trial.`}
          hint={choice ? `Your verdict: ${choice}.` : "Remove must receive more votes than Spare. Ties spare."}
        >
          <Button variant="destructive" onClick={() => onChoice("Remove")}>
            Remove badge
          </Button>
          <Button variant="outline" onClick={() => onChoice("Spare")}>
            Spare
          </Button>
        </Action>
      );
    case "night": {
      const verb = role === "Detective" ? "Investigate" : role === "Doctor" ? "Protect" : role === "Mafia" ? "Attack" : null;
      return (
        <Action
          title={verb ? `${verb} one member.` : "Night is in progress."}
          hint={verb ? "Your target and action remain private." : "Review public history while night actions resolve."}
        >
          {verb && (
            <Button
              disabled={!targetable || (role === "Mafia" && target.removed)}
              onClick={() => onChoice(`${verb} ${target.name}`)}
            >
              {verb} {target.name}
            </Button>
          )}
        </Action>
      );
    }
    case "morning":
      return (
        <Action
          title="Morning arrives."
          hint="Sample public outcome: nobody lost their badge. The cause stays hidden."
        />
      );
    case "finale":
      return (
        <Action title="Final reveal." hint="Roles shown on every seat; awards follow a completed match.">
          <Button variant="outline" onClick={() => onChoice("recap")}>
            View sample recap
          </Button>
        </Action>
      );
  }
}

function Action({ title, hint, children }: { title: string; hint: string; children?: React.ReactNode }) {
  return (
    <footer className="flex min-h-20 items-center gap-4 border-t border-border bg-background px-6 py-4 max-md:flex-wrap">
      <div className="min-w-0 flex-1">
        <strong className="block text-[13px]">{title}</strong>
        <small className="block text-[11px] text-muted-foreground">{hint}</small>
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </footer>
  );
}
