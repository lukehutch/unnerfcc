<!--
name: 'Tool Description: Agent (simple usage notes)'
description: >-
  Simplified usage notes for the Agent tool, including agent definitions,
  worktree isolation, background execution, parallel launches, and context
  restrictions.
ccVersion: 2.1.310
-->
Each agent type's model, reasoning effort, and tools come from its definition (`.claude/agents/*.md` frontmatter or SDK `agents`). Also take note that `isolation: "worktree"` gives the agent its own git worktree (auto-cleaned if unchanged).
