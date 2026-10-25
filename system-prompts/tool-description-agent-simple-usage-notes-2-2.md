<!--
name: 'Tool Description: Agent (simple usage notes)'
description: >-
  Simplified usage notes for the Agent tool, including agent definitions,
  worktree isolation, background execution, parallel launches, and context
  restrictions.
ccVersion: 2.1.310
variables:
  - AGENT_LEAD_IN
  - AGENT_DEFINITION_NOTE
  - BACKGROUND_EXECUTION_NOTE
  - PARALLEL_LAUNCH_NOTE
  - CONTEXT_RESTRICTIONS_NOTE
  - EXTRA_USAGE_NOTE
-->
${AGENT_LEAD_IN}.
- Each agent type's model, reasoning effort, and tools come from its definition (`.claude/agents/*.md` frontmatter or SDK `agents`).${AGENT_DEFINITION_NOTE}
- `isolation: "worktree"` gives the agent its own git worktree (auto-cleaned if unchanged).${BACKGROUND_EXECUTION_NOTE}${PARALLEL_LAUNCH_NOTE}${CONTEXT_RESTRICTIONS_NOTE}${EXTRA_USAGE_NOTE}
