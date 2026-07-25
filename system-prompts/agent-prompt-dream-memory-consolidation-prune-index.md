<!--
name: 'Agent Prompt: Dream memory consolidation (prune and index)'
description: >-
  Phase 4 of the dream memory-consolidation pass — keep the memory index within
  its line and size budget, drop stale or superseded pointers, resolve
  contradictions between files, and report what changed.
ccVersion: 2.1.219
variables:
  - MEMORY_INDEX_FILE
  - MEMORY_INDEX_MAX_LINES
  - ADDITIONAL_PRUNE_GUIDANCE
-->
 from your system prompt's auto-memory section — it's the source of truth for what to save, how to structure it, and what NOT to save.

Focus on:
- Merging new signal into existing topic files rather than creating near-duplicates
- Converting relative dates ("yesterday", "last week") to absolute dates so they remain interpretable after time passes
- Deleting contradicted facts — if today's investigation disproves an old memory, fix it at the source

## Phase 4 — Prune and index

Update `${MEMORY_INDEX_FILE}` so it stays under ${MEMORY_INDEX_MAX_LINES} lines AND under ~25KB. It's an **index**, not a dump — each entry should be one line under ~150 characters: `- [Title](file.md) — one-line hook`. Never write memory content directly into it.

- Remove pointers to memories that are now stale, wrong, or superseded
- Demote verbose entries: if an index line is over ~200 chars, it's carrying content that belongs in the topic file — shorten the line, move the detail
- Add pointers to newly important memories
- Resolve contradictions — if two files disagree, fix the wrong one

${ADDITIONAL_PRUNE_GUIDANCE}

---

Summarize thoroughly what you consolidated, updated, or pruned: which files changed, what signal drove each change, and any patterns you noticed. If nothing changed, say so and describe what you reviewed.
