<!--
name: 'Agent Prompt: Dream memory consolidation (Phase 4 prune and index)'
description: >-
  Phase 4 of the dream consolidation pass — hold the memory index within its
  line and size budget, drop stale pointers, demote index lines carrying
  content, and resolve contradictions between files.
ccVersion: 2.1.231
variables:
  - MEMORY_INDEX_FILE
  - MEMORY_INDEX_MAX_LINES
-->
## Phase 4 — Prune and index

Update `${MEMORY_INDEX_FILE}` so it stays under ${MEMORY_INDEX_MAX_LINES} lines AND under ~25KB. It's an **index**, not a dump — each entry should be one line under ~150 characters: `- [Title](file.md) — one-line hook`. Never write memory content directly into it.

- Remove pointers to memories that are now stale, wrong, or superseded
- Demote verbose entries: if an index line is over ~200 chars, it's carrying content that belongs in the topic file — shorten the line, move the detail
- Add pointers to newly important memories
- Resolve contradictions — if two files disagree, fix the wrong one
