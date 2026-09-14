// Regenerates the roster PFPs: restyles each official photo in
// design/roster/reference/ into the house realistic-manga style via a
// gpt-image-1 edit, writing 1024px PNGs to design/roster/generated/.
//
// Usage: OPENAI_API_KEY=sk-... bun design/roster/generate-roster-pfps.mjs [seat ...]
//   seat: 1-24; omit to do all. Downscale + install with install-roster-pfps.sh.

import { readFile, writeFile, mkdir } from "node:fs/promises";

const SEATS = process.argv.slice(2).map(Number).filter(Boolean);
const ALL = SEATS.length ? SEATS : Array.from({ length: 24 }, (_, i) => i + 1);
const CONCURRENCY = 4;

const PROMPT =
  "Redraw this photo as a realistic manga-style portrait while staying " +
  "completely faithful to the photograph. Same person, same face: identical " +
  "facial structure and proportions, realistic eye size and shape, realistic " +
  "nose and lips, identical skin tone, hairstyle, hair color, expression, and " +
  "head angle. Do NOT stylize the face into anime proportions — keep realistic " +
  "human features; apply only clean manga ink linework, soft cel shading, and " +
  "a warm palette over the realistic likeness. Tight head-and-shoulders " +
  "close-up, face large in the frame, plain warm neutral background, square " +
  "composition. No text, no watermark, no border, no frame.";

// Per-seat likeness notes appended to PROMPT (features the model tends to drop).
const NOTES = {
  6: "Her eyes are light blue-gray (colored lenses) — render them light blue-gray.",
};

async function generateOne(seat) {
  const id = String(seat).padStart(2, "0");
  const img = await readFile(new URL(`./reference/s${id}.png`, import.meta.url));
  const form = new FormData();
  form.append("model", "gpt-image-1");
  form.append("quality", "medium");
  form.append("size", "1024x1024");
  form.append("prompt", PROMPT + (NOTES[seat] ? ` ${NOTES[seat]}` : ""));
  form.append("image", new Blob([img], { type: "image/png" }), `s${id}.png`);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch("https://api.openai.com/v1/images/edits", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: form,
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`HTTP ${res.status}: ${body.slice(0, 300)}`);
      }
      const json = await res.json();
      const b64 = json.data?.[0]?.b64_json;
      if (!b64) throw new Error("no b64_json in response");
      const out = `design/roster/generated/s${id}.png`;
      await writeFile(out, Buffer.from(b64, "base64"));
      console.log(`seat ${id} ok -> ${out}`);
      return;
    } catch (err) {
      const retryable = /HTTP (429|5\d\d)/.test(String(err.message));
      console.log(`seat ${id} attempt ${attempt} failed: ${err.message}`);
      if (!retryable || attempt === 3) {
        console.log(`seat ${id} FAILED`);
        return;
      }
      await new Promise((r) => setTimeout(r, attempt * 15000));
    }
  }
}

await mkdir("design/roster/generated", { recursive: true });
const queue = [...ALL];
const workers = Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const seat = queue.shift();
    if (seat) await generateOne(seat);
  }
});
await Promise.all(workers);
console.log("done");
