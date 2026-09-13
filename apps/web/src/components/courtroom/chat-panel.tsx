"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FIXTURE_CHATS, MEMBERS, type Channel, type ChatMessage, type Phase } from "./fixtures";

export function ChatPanel({ phase }: { phase: Phase }) {
  const [channel, setChannel] = useState<Channel>("match");
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<Record<Channel, ChatMessage[]>>({
    match: [],
    audience: [],
    mafia: [],
  });

  const writable = useMemo(() => {
    if (channel === "audience") return true; // fixture: reviewer audience view
    if (channel === "mafia") return phase === "night";
    return ["discussion", "accusation"].includes(phase);
  }, [channel, phase]);

  const messages = [...FIXTURE_CHATS[channel], ...extra[channel]];

  // Follow new messages: jump on channel switch, follow appends when the
  // reader is already near the bottom. Never yank someone reading history.
  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    el.scrollTo({ top: el.scrollHeight, behavior: nearBottom ? "smooth" : "auto" });
  }, [messages.length, channel]);

  const submit = () => {
    const text = draft.trim();
    if (!text || !writable) return;
    setExtra((prev) => ({
      ...prev,
      [channel]: [...prev[channel], { kind: "chat", seat: -1, text, time: "now" }],
    }));
    setDraft("");
  };

  return (
    <section
      aria-label="Chat"
      className="flex min-h-0 flex-col border-l border-border bg-card/40"
    >
      <div className="border-b border-border px-5 pt-5 pb-3">
        <div className="mb-3 flex items-center justify-between text-xs">
          <strong className="font-display text-sm tracking-wide">
            {channel === "match" ? "MATCH CHAT" : channel === "audience" ? "AUDIENCE CHAT" : "PRIVATE MAFIA CHAT"}
          </strong>
          <span className="text-muted-foreground">{channel === "audience" ? "Audience" : "Cast"}</span>
        </div>
        <Tabs value={channel} onValueChange={(v) => setChannel(v as Channel)}>
          <TabsList className="bg-transparent p-0">
            <TabsTrigger value="match" className="border-b-2 rounded-none border-transparent px-2 data-[state=active]:border-ring data-[state=active]:bg-transparent">
              Match
            </TabsTrigger>
            <TabsTrigger value="audience" className="border-b-2 rounded-none border-transparent px-2 data-[state=active]:border-ring data-[state=active]:bg-transparent">
              Audience
            </TabsTrigger>
            <TabsTrigger value="mafia" className="border-b-2 rounded-none border-transparent px-2 data-[state=active]:border-ring data-[state=active]:bg-transparent">
              Mafia · private
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div ref={logRef} role="log" aria-label="Conversation" className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        <AnimatePresence initial={false}>
          {messages.map((m, i) =>
            m.kind === "event" ? (
              m.caseFile ? (
                <motion.p
                  key={`${channel}-case-${i}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 rounded-r-md border-l-2 border-ring bg-ring/10 px-3 py-2 font-mono text-[11px] leading-relaxed text-foreground"
                >
                  <span className="mb-0.5 block font-semibold tracking-widest text-ring">{m.caseFile}</span>
                  {m.text}
                </motion.p>
              ) : (
                <motion.p
                  key={`${channel}-event-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-5 border-l-2 border-ring bg-muted/60 px-3 py-2 text-[11px] text-muted-foreground"
                >
                  {m.text}
                </motion.p>
              )
            ) : (
              <motion.article
                key={`${channel}-${i}-${m.time}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="mb-5"
              >
                <header className="mb-1 flex items-center gap-2 text-[11px]">
                  <button
                    type="button"
                    className={cn("font-semibold", m.gallery && "text-muted-foreground line-through")}
                    disabled={m.seat < 0}
                  >
                    {m.seat < 0 ? (channel === "audience" ? "WAV" : "Mafia teammate") : MEMBERS[m.seat].name}
                    {m.gallery ? " · gallery" : ""}
                  </button>
                  <time className="ml-auto font-mono text-[10px] text-muted-foreground">{m.time}</time>
                </header>
                <p className="text-[13px] leading-relaxed break-words">{m.text}</p>
              </motion.article>
            )
          )}
        </AnimatePresence>
      </div>

      <p className="border-t border-border px-5 py-2 text-[11px] text-muted-foreground">
        {channel === "mafia"
          ? "Private night discussion. Excluded from public replay."
          : channel === "audience"
            ? "The cast cannot access this audience channel."
            : writable
              ? "Your accepted messages become part of public match history."
              : "Public writing resumes at the next discussion."}
      </p>

      <form
        className="flex gap-2 px-4 pt-2 pb-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Input
          value={draft}
          maxLength={240}
          disabled={!writable}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={writable ? "Write a message…" : "Read-only in this view"}
          aria-label="Message"
        />
        <Button type="submit" disabled={!writable || !draft.trim()}>
          Send
        </Button>
      </form>
    </section>
  );
}
