<!--
name: 'Tool Description: Agent explicit-spawn restriction'
description: >-
  Restricts agent spawning to explicit user requests or named agent types
  instead of inferred thoroughness
ccVersion: 2.1.178
-->


**Spawn agents whenever parallel investigation or fan-out would produce a more thorough, accurate answer.** Brief each spawn well because it starts cold. Use this tool when the user asks for a subagent or names an agent type, and proactively for independent angles, several parts, broad search, or verification. Launch parallel agents for independent subtasks; keep work inline only when delegation adds no coverage.
