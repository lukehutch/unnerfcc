<!--
name: 'Agent Prompt: Dream memory consolidation (prune, no index)'
description: >-
  Phase 4 of the dream consolidation pass for memory directories with no index
  file — keep every memory's frontmatter accurate and one-line, drop stale or
  superseded memories, and resolve contradictions between files.
ccVersion: 2.1.231
-->
## Phase 4 — Prune

Keep each memory file's frontmatter (`name`, `description`) accurate and one-line — the index shown in future sessions is assembled from those fields at load time, so a stale `description` is a stale index entry.

- Remove memories that are now stale, wrong, or superseded
- Resolve contradictions — if two files disagree, fix the wrong one
