# tweakcc system prompts — un-nerfed edition

**Claude Code's own system prompts, rewritten to make the model thorough instead of terse.** Claude Code ships with its prompts baked into the binary, and they lean hard on brevity — "be concise," "do the minimum," "report back in two sentences" — by roughly 5:1 over instructions to be thorough. Those directives don't just shorten chat replies; they push the model to write shallower code, investigate less, and under-report what it found. This repo extracts the prompts, lifts the directives that cap *engineering depth, investigation, and response length* — plus the over-broad flags and refusals that fire on legitimate work — and patches them back into the binary with [tweakcc-fixed](https://github.com/skrabe/tweakcc-fixed), so Claude Code does the careful, senior-grade version of the work, unrestricted on legitimate tasks, by default. Safety enforcement stays where it actually lives — server-side and trained into the model — so lifting the redundant *local* reminders cuts the false-positive rate without touching what prevents genuine harm (see the thesis).

This is the live set I run daily — not cleaned up for public consumption, in-progress un-nerfs and all.

> [!NOTE]
> **Built from Claude Code v2.1.199** — 111 un-nerf rules across 78 files, `--check` clean, reconstructed byte-identically to a [tweakcc-fixed](https://github.com/skrabe/tweakcc-fixed) extraction. The fork's catalog covers **1,372 prompts** (1,483 binary sites) — ~2.5× what the base tweakcc catalog carries — adding the per-turn fragments, interpolated-variable values, and compact tool-description variants the base tool skips. The v2.1.199 bump itself was a feature build-out (Cowork onboarding, Claude Design, plugin/skill/connector marketplace tooling): 43 prompts added, 2 removed, none touching the brevity/thoroughness posture, so **the version bump needed no new rules** and every existing rule re-applied byte-exactly against fresh stock. The rule count grew from the 81-rule sync baseline via the policy audit (lifting local restrictions; see the thesis), not stock drift. Full sync record: [UNNERF-GUIDE.md](UNNERF-GUIDE.md) Part 9.

**Docs:** [Un-nerf guide](UNNERF-GUIDE.md) (objectives + upgrade playbook) · [Maintenance](MAINTENANCE.md) (script flags) · [Background](BACKGROUND.md) (how tweakcc works)

---

## Install

You need [tweakcc-fixed](https://github.com/skrabe/tweakcc-fixed) to patch these into your Claude Code binary. (It's a strict superset of [Piebald's tweakcc](https://github.com/Piebald-AI/tweakcc); this repo switched to it for the ~2.5× prompt coverage. npm versions ≤ 1.0.5 of the `tweakcc-fixed` package are an unrelated, unmaintained earlier fork — use ≥ 2.0.0.)

> [!IMPORTANT]
> unnerfcc **owns** `~/.tweakcc/system-prompts/` — every run overwrites it with the un-nerfed set, so you can't also keep your own manual tweakcc-fixed prompt edits there (they'd be clobbered). Fold any edits you care about into the un-nerf rules (`scripts/apply-unnerfs.py`) instead. And `install.sh` keeps **no** binary backup — it's ~400 MB and stock is always re-extractable from the binary — so to roll back you reinstall Claude Code: `npm install -g @anthropic-ai/claude-code@<version>`.
>
> Also: tweakcc-fixed ships extra binary patches of its own, and two **default-on** ones change model-facing behavior beyond prompts (dream-mode memory consolidation; CLAUDE.md-once-per-conversation). `install.sh` seeds those two flags to `false` in `~/.tweakcc/config.json` — only when you haven't set them yourself — so unnerfcc keeps changing *prompts only*. Re-enable them in the tweakcc-fixed TUI if you want those features.

**Quick (recommended).** [`install.sh`](install.sh) detects your CC version, rebuilds that version's stock prompts, replays every un-nerf, patches the binary, and **verifies the change actually landed** — failing loudly and leaving your binary clean if it didn't:

```bash
./install.sh          # --help for options (--prompts-only, --dry-run)
```

It runs non-interactively and builds tweakcc-fixed from `main` on purpose: npm releases can lag a fresh CC build by hours-to-days, and `main` carries the prompt-locator/repack fixes soonest. (Set `TWEAKCC_VERSION=latest` to use a released tweakcc-fixed via `npx` instead.)

**Manual.** Extract stock prompts, then overlay the un-nerfed ones:

```bash
rm -rf ~/.tweakcc/system-prompts     # clean slate — tweakcc-fixed won't overwrite edited files
npx -y tweakcc-fixed@latest          # extract fresh stock via the TUI
cp system-prompts/*.md ~/.tweakcc/system-prompts/   # overlay this repo's un-nerfs
npx -y tweakcc-fixed@latest --apply  # a bare --apply is what applies .md edits
# then restart any running Claude Code sessions
```

On Windows, swap `rm -rf`→`Remove-Item -Recurse -Force` and `cp`→`Copy-Item`. Leave the rest of `~/.tweakcc/` alone — `config.json`, the hash files, and `native-binary.backup` must survive. Always confirm the patch took (unpack + grep) before trusting it; see [UNNERF-GUIDE.md](UNNERF-GUIDE.md) Part 7.

You don't have to patch anything to get value here — the files stand alone as a prompt-engineering reference. Browse [`system-prompts/`](system-prompts), diff stock against un-nerfed to see how brevity directives shape behavior, or cherry-pick individual `.md` files; each is self-contained.

---

## The un-nerf thesis

Claude Code's stock prompts lean hard on holding back — be brief, do the minimum, investigate only as far as needed, flag and hedge, refuse anything that pattern-matches a risk. This project lifts those leashes. **One direction, always: lift restrictions; never add them.** What gets lifted:

1. **Length / chat brevity** — "respond in 2-3 sentences." Caps how much Claude tells you. Lifted — length is your call, not the prompt's.
2. **Implementation brevity** — "don't add abstractions," "simplest approach." Produces shallow code. Lifted — implement to a senior standard.
3. **Process brevity** — "as quickly as possible," "2-sentence summary." Produces under-investigation and under-reporting. Lifted — investigate and report as thoroughly as the work deserves.
4. **Local flags / refusals** — suspected-injection alarms, "refuse anything resembling X," anti-malicious reminders, self-hedging. Lifted — see below.
5. **Thoroughness** — "think step by step," "consider edge cases." Already good; amplified where weakened.

**On the flags (group 4).** These run in the *local* prompt on your machine — they are not what enforces safety. Anthropic refuses genuinely harmful requests server-side and in the model, on every API call, regardless of the local prompt; this repo only edits local text, so it *can't* disable that (which is why lifting the local reminders doesn't enable misuse — the model still refuses genuine harm). What the local layer adds is a redundant filter with a high false-positive rate that interrupts legitimate work. So we lift all local restrictions and rely on server-side enforcement.

**The one thing kept local:** protection of *you* from *your own* hijacked or misfiring agent — accidental prompt injection from spawned agents/skills/content, unintended damage to your filesystem, account hijacking, or exfiltration of your data you didn't ask for. Server-side guardrails don't cover this (nothing stops a hijacked local agent from `rm -rf`-ing your files or leaking your data), and it has no real false-positive cost, so it stays. It's the only class protected locally — everything else local is lifted.

The goal isn't verbosity or recklessness — it's a capable tool with the leashes that only ever produced false positives removed.

---

## Before / after

**Tone** — `system-prompt-tone-concise-output-short.md`

> **Stock:** Your responses should be short and concise.
>
> **Un-nerfed:** Your responses should be thorough, clear, and rich with explanation, reasoning, and context. Favor depth and completeness over brevity […] There is no word limit; use whatever length the task genuinely warrants.

**Implementation scope** — `system-prompt-doing-tasks-no-additions.md`

> **Stock:** Don't add features, refactor, or introduce abstractions beyond what the task requires […] Three similar lines is better than a premature abstraction.
>
> **Un-nerfed:** Implement the task completely and to a senior-engineer standard. Handle the edge cases, error paths, and failure modes the task implies […] Leave every file you touch clearer than you found it. And never ship a half-finished implementation.

The pattern holds throughout: stock leads with the prohibition and caps work at the literal ask; the un-nerf leads with the requirement and preserves any genuinely-good clause (safety caveats, "never half-finished").

---

## Repo layout

```
├── install.sh                    # one-command installer (fetches latest rules from git)
├── system-prompt-checksums.json  # MD5 of every STOCK prompt; drives change detection
├── scripts/
│   ├── sync-version.mjs          # rebuild stock prompts + auto-diff the checksum manifest
│   ├── prompt-checksums.mjs      # MD5 manifest tool
│   └── apply-unnerfs.py          # replay all un-nerfs after a CC version bump
└── system-prompts/               # 1,372 markdown files (Claude Code v2.1.199, tweakcc-fixed catalog)
```

`system-prompts/` holds the un-nerfed prompts (`tool-description-*`, `system-prompt-*`, `system-reminder-*`, `data-*`, `agent-prompt-*`, `skill-*`, `tool-parameter-*`, `tool-result-*`, `workflow-*`). The checksum manifest fingerprints **stock**, not the un-nerfed files — so on a version bump `sync-version.mjs` reports exactly what Anthropic changed, uncoloured by the un-nerfs. See [UNNERF-GUIDE.md](UNNERF-GUIDE.md).

---

## Compatibility

- **Claude Code:** built from v2.1.199 (the latest release, and the newest tweakcc-fixed has prompt data for). Per-prompt `ccVersion:` frontmatter records when each prompt last changed. Upgrade playbook: [UNNERF-GUIDE.md](UNNERF-GUIDE.md).
- **Models:** tuned for current Claude (Opus 4.8 / Sonnet 4.6 / Haiku 4.5). Older or smaller models may over-explain trivial asks.
- **Watch for over-verbosity** — the main failure mode. If Claude writes essays for "what time is it?", start with `system-prompt-communication-style.md` and `system-prompt-tone-concise-output-short.md`. Thorough output also costs more tokens; plan accordingly.

---

## Credits & license

- **[tweakcc-fixed](https://github.com/skrabe/tweakcc-fixed)** by skrabe — the patcher this repo now targets: ~2.5× the prompt coverage of the base tool, plus native-install overrides.
- **[tweakcc](https://github.com/Piebald-AI/tweakcc)** by Piebald AI — the original tool that makes all of this possible (tweakcc-fixed is a fork of it).
- **[lobotomized-claude-code](https://github.com/skrabe/lobotomized-claude-code)** by skrabe — the opposite thesis (cut prompts down per-model rather than flip them to thoroughness), and the source of several craft lessons folded into the un-nerf register rules and the orphan-variable guard ([UNNERF-GUIDE.md](UNNERF-GUIDE.md) Parts 1 and 6).
- **[tweakcc-system-prompts-unnerfed](https://github.com/BenIsLegit/tweakcc-system-prompts-unnerfed)** by BenIsLegit — the upstream project this repo was forked from, and the inspiration for it.
- **[roman01la's gist](https://gist.github.com/roman01la/483d1db15043018096ac3babf5688881)** — the original thesis and first 11 patches, translated into tweakcc format ([BACKGROUND.md](BACKGROUND.md#the-original-gist)).
- **Anthropic** — for Claude Code, and for not going out of their way to stop community patching.

Prompt text in `system-prompts/*.md` is Anthropic's copyright, extracted by tweakcc-fixed and modified; redistributed as a modified subset on a fair-use / research basis. The docs and repo organization are **CC0 / public domain**.

These change Claude Code's behavior in ways that may not suit your workflow — test in a throwaway session first. To roll back, reinstall Claude Code (no binary backup is kept — see the note under [Install](#install)). Something misbehaving? Open an issue or PR.
