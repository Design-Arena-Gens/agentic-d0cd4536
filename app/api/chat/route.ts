import { NextResponse } from 'next/server';

function generateReply(message: string): string {
  const trimmed = message.trim();
  if (!trimmed) return "Please share a prompt to begin.";

  // Simple, deterministic heuristic: classify intent and respond concisely
  const lower = trimmed.toLowerCase();
  const isHow = /^(how|what|why|when|where|who)\b/.test(lower);
  const isPlan = /(plan|roadmap|steps|milestone|strategy)/.test(lower);
  const isSummarize = /(summarize|tl;dr|condense|brief)/.test(lower);

  if (isPlan) {
    return [
      "Plan",
      "- Goal: clarify the desired outcome.",
      "- Inputs: list constraints, resources, dependencies.",
      "- Steps: 3-7 concrete, ordered actions.",
      "- Risks: top 2-3 with mitigations.",
      "- Next: smallest 15-min task to start.",
    ].join("\n");
  }

  if (isSummarize) {
    return "TL;DR: Provide the key point in one sentence, then 3 bullets: context, decision, next step.";
  }

  if (isHow || lower.includes("explain")) {
    return "Answer: 2-3 concise paragraphs. Add a quick example and a pitfall to avoid.";
  }

  // Fallback: reflect and respond with a helpful structure
  const reversed = [...trimmed].reverse().join("");
  return [
    `Echo: ${trimmed}`,
    "Perspective: I can break this down or draft a quick plan.",
    `Fun fact: your prompt reversed is \"${reversed.slice(0, 42)}\"?`,
  ].join("\n");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const message = typeof body?.message === 'string' ? body.message : '';
  const reply = generateReply(message);
  return NextResponse.json({ reply });
}
