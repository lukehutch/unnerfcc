<!--
name: 'Tool Description: Agent (simple usage notes)'
description: >-
  Simplified usage notes for the Agent tool, including when to delegate, fork
  behavior, resumption, worktree isolation, background execution, parallel
  launches, and context restrictions
ccVersion: 2.1.218
variables:
  - TOOL_BASE_DESCRIPTION
  - HAS_PRO_RESTRICTION_NOTE
  - CAN_FORK_CONTEXT
  - FORK_BACKGROUND_NOTE
  - RELAY_TO_USER_VARIANT
  - SEND_MESSAGE_TOOL_NAME
  - AGENT_TOOL_NAME
  - FORK_INHERIT_NOTE
  - RUN_IN_BACKGROUND_NOTE
  - PARALLEL_AGENTS_NOTE
  - CONTEXT_RESTRICTION_NOTE
-->
${TOOL_BASE_DESCRIPTION}${HAS_PRO_RESTRICTION_NOTE?"":CAN_FORK_CONTEXT?`

## When to use

Reach for this when the task matches an available agent type, when you have independent work to run in parallel, or when answering would mean reading across several files — delegate it and you keep the conclusion, not the file dumps. ${"For a single-fact lookup where you already know the file, symbol, or value, search directly. Once you've delegated a search, don't also run it yourself — wait for the result."}`:`

## When to use

${"For a single-fact lookup where you already know the file, symbol, or value, search directly. Once you've delegated a search, don't also run it yourself — wait for the result."}`}${FORK_BACKGROUND_NOTE}

- ${RELAY_TO_USER_VARIANT?"The agent's final report is not shown to the user — relay the agent's findings, reasoning, and any relevant detail thoroughly, rather than stripping it down; summarize only as much as needed to keep it readable, and preserve substance.":"The agent's final message is returned to you as the tool result; it is not shown to the user — relay the agent's findings, reasoning, and any relevant detail thoroughly, rather than stripping it down; summarize only as much as needed to keep it readable, and preserve substance."}
- Use ${SEND_MESSAGE_TOOL_NAME} with the agent's ID or name to continue a previously spawned agent with its context intact; a new ${AGENT_TOOL_NAME} call starts fresh${FORK_INHERIT_NOTE?' (except subagent_type: "fork", which inherits your context)':""}.
- Each agent type's model, reasoning effort, and tools come from its definition (\`.claude/agents/*.md\` frontmatter or SDK \`agents\`).
- \`isolation: "worktree"\` gives the agent its own git worktree (auto-cleaned if unchanged).${RUN_IN_BACKGROUND_NOTE}${PARALLEL_AGENTS_NOTE}${CONTEXT_RESTRICTION_NOTE}
