<!--
name: 'Tool Parameter: Agent Model Override'
description: >-
  Task/agent model param: optional per-agent model override; ignored for fork
  subagents which inherit the parent model.
ccVersion: 2.1.178
-->
Optional model override for this agent. Takes precedence over the agent definition's model frontmatter. If omitted, uses the agent definition's model, or inherits from the parent. Ignored for subagent_type: "fork" — forks always inherit the parent model.
