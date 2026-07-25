<!--
name: 'Tool Description: Agent (simple usage notes)'
description: >-
  Simplified usage notes for the Agent tool, including agent definitions,
  worktree isolation, background execution, parallel launches, and context
  restrictions
ccVersion: 2.1.219
variables:
  - RUN_IN_BACKGROUND_NOTE
  - PARALLEL_AGENTS_NOTE
  - CONTEXT_RESTRICTION_NOTE
-->
.
- Each agent type's model, reasoning effort, and tools come from its definition (`.claude/agents/*.md` frontmatter or SDK `agents`).
- `isolation: "worktree"` gives the agent its own git worktree (auto-cleaned if unchanged).${RUN_IN_BACKGROUND_NOTE}${PARALLEL_AGENTS_NOTE}${CONTEXT_RESTRICTION_NOTE}
