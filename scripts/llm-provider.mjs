/**
 * llm-provider.mjs — shared LLM-calling helper for classify.mjs (and, as they
 * are migrated, upgrade.sh's relabel/bucket-analyze steps): abstracts "which
 * model actually does the classification/labeling work" behind two providers.
 *
 * PROVIDERS
 * ---------
 *   claude  Shells out to the `claude` CLI headless (-p). AGENTIC: the model
 *           can read/write files in workDir and grep a bundle/ directory for
 *           disambiguating context — the existing, battle-tested path.
 *   gemini  Calls the Gemini REST API's generateContent endpoint directly.
 *           NON-AGENTIC: a single request/response turn, no file access from
 *           inside the model call. The caller must inline everything the
 *           claude path would tell the agent to "read from a file" directly
 *           into the prompt text, and cannot offer a "grep the bundle for
 *           context" escape hatch — that needs tool-use/function-calling,
 *           which this first pass does not implement. Structured output
 *           (responseSchema) is used to make "the returned JSON is valid"
 *           a server-enforced guarantee rather than a hopeful parse.
 *
 * API KEY
 * -------
 * findGeminiApiKey() checks, in order: the GOOGLE_GEMINI_API_KEY environment
 * variable, then a GOOGLE_GEMINI_API_KEY=... line (optionally `export `-
 * prefixed, optionally quoted) in <repoRoot>/.env, then the same in ~/.env.
 * Returns null (never throws) if none of the three has it — callers decide
 * how to report that as an error, since "no key" means different things to
 * a CLI (die loudly) vs. a library caller (maybe fall back to Claude).
 *
 * EFFORT
 * ------
 * Gemini's "thinking" models take a token-count thinking budget, not an
 * enum, so classify.mjs's existing low|medium|high|xhigh|max --effort is
 * mapped through THINKING_BUDGET below. These are reasonable defaults, not
 * measured optima — tune via GEMINI_THINKING_BUDGET_<LEVEL> env overrides if
 * a specific model's sweet spot differs.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

// --- .env lookup --------------------------------------------------------
function parseEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const rawLine of readFileSync(path, "utf8").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let [, key, val] = m;
    val = val.trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

export function findGeminiApiKey(repoRoot) {
  if (process.env.GOOGLE_GEMINI_API_KEY) return { key: process.env.GOOGLE_GEMINI_API_KEY, source: "environment" };
  const candidates = [
    { path: join(repoRoot, ".env"), source: "./.env" },
    { path: join(homedir(), ".env"), source: "~/.env" },
  ];
  for (const { path, source } of candidates) {
    const vars = parseEnvFile(path);
    if (vars.GOOGLE_GEMINI_API_KEY) return { key: vars.GOOGLE_GEMINI_API_KEY, source };
  }
  return null;
}

// --- effort -> thinking budget (tokens; -1 = model-decided "dynamic") ---
const THINKING_BUDGET = {
  low: parseInt(process.env.GEMINI_THINKING_BUDGET_LOW ?? "1024", 10),
  medium: parseInt(process.env.GEMINI_THINKING_BUDGET_MEDIUM ?? "8192", 10),
  high: parseInt(process.env.GEMINI_THINKING_BUDGET_HIGH ?? "16384", 10),
  xhigh: parseInt(process.env.GEMINI_THINKING_BUDGET_XHIGH ?? "24576", 10),
  max: parseInt(process.env.GEMINI_THINKING_BUDGET_MAX ?? "-1", 10),
};

export const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.7-flash";

/**
 * Call Gemini's generateContent endpoint once. Returns:
 *   { ok: true, parsed, raw }                         on a valid, schema-
 *                                                      conforming JSON reply
 *   { ok: false, status, detail }                      on any failure — a
 *   network error, a non-2xx HTTP status, a malformed response envelope, or
 *   a reply that isn't valid JSON. Never throws; the caller treats a
 *   failure exactly like a "no result.json" claude failure (retry-eligible).
 *
 * If workDir is given, a successful call also writes workDir/result.json —
 * so callers written against the claude contract (read workDir/result.json
 * after the call) work unchanged regardless of provider.
 */
export async function callGemini({ apiKey, model, effort, prompt, resultSchema, workDir, timeoutMs = 30 * 60 * 1000 }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const generationConfig = { responseMimeType: "application/json" };
  if (resultSchema) generationConfig.responseSchema = resultSchema;
  if (effort) generationConfig.thinkingConfig = { thinkingBudget: THINKING_BUDGET[effort] ?? THINKING_BUDGET.medium };
  const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (e) {
    return { ok: false, status: null, detail: `network error calling Gemini: ${e.message}` };
  } finally {
    clearTimeout(timer);
  }

  const text = await res.text();
  if (!res.ok) {
    return { ok: false, status: res.status, detail: `Gemini API error ${res.status}: ${text.slice(0, 800)}` };
  }
  let envelope;
  try { envelope = JSON.parse(text); }
  catch (e) { return { ok: false, status: res.status, detail: `Gemini response envelope was not valid JSON: ${e.message}` }; }

  const finishReason = envelope?.candidates?.[0]?.finishReason;
  const responseText = envelope?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof responseText !== "string") {
    return { ok: false, status: res.status, detail: `Gemini response missing candidates[0].content.parts[0].text (finishReason=${finishReason}): ${text.slice(0, 800)}` };
  }
  let parsed;
  try { parsed = JSON.parse(responseText); }
  catch (e) { return { ok: false, status: res.status, detail: `Gemini's own output was not valid JSON (finishReason=${finishReason}): ${e.message} — raw (last 500 chars): ${responseText.slice(-500)}` }; }

  if (workDir) writeFileSync(join(workDir, "result.json"), JSON.stringify(parsed));
  return { ok: true, parsed, raw: responseText };
}
