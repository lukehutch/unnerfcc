<!--
name: 'Tool Description: Agent (self-contained prompt notes)'
description: >-
  Agent tool usage notes explaining that a spawned agent sees only the prompt,
  where its model and tools come from, and that the prompt must state whether to
  write code or research.
ccVersion: 2.1.219
-->
, so the prompt must be self-contained.
- Each agent type's model, reasoning effort, and tool access are set in its definition (`.claude/agents/*.md` frontmatter, or the SDK `agents` option); the `model` parameter here overrides the definition for this one call.
- Clearly tell the agent whether you expect it to write code or just to do research (search, file reads, web fetches, etc.), since a fresh agent is not aware of the user's intent
