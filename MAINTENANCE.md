# Maintenance — script reference

Flag-level reference for the scripts in `scripts/`. The end-to-end upgrade
playbook — objectives, the keep/flip decision procedure, the review method, and
binary verification — lives in **[UNNERF-GUIDE.md](UNNERF-GUIDE.md)**. Start
there; this file is just the knobs.

Two scripts do the work of a version bump:

- **`sync-version.mjs`** rebuilds `system-prompts/` as fresh STOCK for a given Claude Code version and diffs it against the checksum manifest.
- **`apply-unnerfs.py`** replays every un-nerf onto that stock.

Together they handle most of a refresh automatically; you only step in when upstream reworded the exact text a rule targets (UNNERF-GUIDE Part 6).

---

## `sync-version.mjs`

Node ES module, pinned to `gray-matter@4.0.3` — the exact dependency tweakcc uses — so its output is byte-identical to a tweakcc extraction. Rebuilds every `.md` in `system-prompts/` from the `prompts-X.Y.Z.json` that tweakcc publishes for that version. On every run it also diffs the fresh stock against `system-prompt-checksums.json`, prints what Anthropic CHANGED / ADDED / REMOVED, and rewrites the manifest.

**One-time setup** (installs the pinned dep into `scripts/node_modules/`; lockfile is checked in, so it's reproducible and idempotent):

```bash
cd scripts && npm install --ignore-scripts --save-exact && cd ..
```

**Usage:**

```bash
node scripts/sync-version.mjs X.Y.Z --download          # rebuild stock from tweakcc's published JSON
node scripts/sync-version.mjs                            # prompt interactively for the version
node scripts/sync-version.mjs X.Y.Z --download --dry-run # preview, write nothing
```

| Flag | What it does |
|---|---|
| *(none)* | Wipe `./system-prompts/*.md` and rewrite from the JSON for the given version. |
| `--download` | Skip the local-clone check; always fetch the JSON from GitHub. **Use this** unless you keep a local tweakcc clone. |
| `--tweakcc-dir PATH` | Local tweakcc clone to read the JSON from. The built-in default is a maintainer-specific path; pass `--download` to ignore it. |
| `--target PATH` | Output directory (default `./system-prompts/`). |
| `--manifest PATH` | Stock-checksum manifest to diff against and update (default `system-prompt-checksums.json`). |
| `--dry-run` | Report what would change (including the stock diff) without writing. |
| `--no-clear` | Don't delete existing `.md` before writing. |
| `--no-manifest` | Don't read or write the checksum manifest. |
| `-h`, `--help` | Show usage. |

The printed CHANGED/ADDED/REMOVED diff — not `git diff` on the un-nerfed tree — is your clean "what changed upstream" worklist (`git diff` mixes upstream changes with your un-nerf reverts; the manifest diff doesn't). If tweakcc hasn't published the JSON for your version yet, the script exits with a 404 — see UNNERF-GUIDE Part 8.

---

## `apply-unnerfs.py`

Stdlib-only Python, no pip install, safe to run repeatedly. Reads every `.md` in `system-prompts/`, matches each against the `(stock, unnerf)` rules in `RULES`, and does string replacement. Per rule:

| Result | Meaning |
|---|---|
| **APPLIED** | Found stock text, replaced it with the un-nerf. |
| **SKIPPED** | Un-nerf already present — nothing to do. |
| **NORMALIZED** | No content change, but CRLF line endings fixed to LF. |
| **FAIL** | Neither stock nor un-nerf found — upstream drifted. Needs attention. |

| Flag | What it does |
|---|---|
| *(none)* | Apply all rules to `./system-prompts/`, writing to disk. |
| `--dry-run` | Report what would change without writing. |
| `--check` | Like `--dry-run`, but exit 1 if any rule would apply or fail. CI gate. |
| `--only FILE` | Restrict to one filename (no path prefix). |
| `--verbose` | Show context on SKIPPED entries too. |
| `--dir PATH` | Target a different prompts directory. |

Run it, fix any FAIL, and re-run until the report is all APPLIED/SKIP/NORMALIZED — then gate with `--check` (exit 0). A FAIL quotes both the stock text it looked for and the un-nerf it expected, so you know exactly what to find; resolve it with the drift table in UNNERF-GUIDE Part 6. To add a new un-nerf, add a `Rule(stock, unnerf, description)` to `RULES` (byte-exact `stock`, preferably a short unique substring) — full recipe in UNNERF-GUIDE Part 6.

**CI / pre-commit:**

```bash
python3 scripts/apply-unnerfs.py --check || {
  echo "Un-nerfs not fully applied. Run: python3 scripts/apply-unnerfs.py"
  exit 1
}
```

---

## `prompt-checksums.mjs`

The MD5-manifest tool `sync-version.mjs` uses internally, also runnable standalone against a **stock** tree (a tweakcc extraction or a `sync-version.mjs --target` output — never the un-nerfed `system-prompts/`):

```bash
node scripts/prompt-checksums.mjs --dir <stock-dir>                              # diff against the manifest (read-only)
node scripts/prompt-checksums.mjs --dir <stock-dir> --check                      # CI gate: exit 1 on drift
node scripts/prompt-checksums.mjs --dir <stock-dir> --ccVersion X.Y.Z --write    # (re)write the manifest
```

What the manifest is and why it fingerprints *stock* (not the un-nerfed files): UNNERF-GUIDE Part 4.

---

## Why a JSON, and not just the binary?

`sync-version.mjs` reads tweakcc's `prompts-X.Y.Z.json` rather than the installed binary because the binary holds the prompt *body text* but nothing else: no catalog of *which* string literals are prompts (the ~526 are buried among thousands), no `name`/`description` (tweakcc's editorial labels live only in the JSON), and no `pieces[]` / `identifierMap` — the interpolation structure tweakcc needs to *locate and patch* each prompt. The binary is enough to **verify** a known prompt is still present (UNNERF-GUIDE Part 7), but reconstructing the named `.md` set for a new version is the work tweakcc publishes per release. Mechanics: UNNERF-GUIDE Part 3.
