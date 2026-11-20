<!--
name: 'Tool Description: Workflow explicit opt-in restriction'
description: >-
  Restricts calling the Workflow tool to explicit user opt-in (ultracode or
  direct request) and directs single-agent or unconfirmed tasks to the Agent
  tool or user confirmation.
ccVersion: 2.1.329
variables:
  - ULTRACODE_SIGNAL
  - AGENT_TOOL_NAME
-->
ONLY call this tool when the user has explicitly opted into multi-agent orchestration. Workflows can spawn dozens of agents and consume a large amount of tokens; the user must request that scale, not have it inferred. Explicit opt-in means one of:
- The user included the keyword "ultracode" in their prompt (you'll see ${ULTRACODE_SIGNAL} confirming it).
- Ultracode is on for the session (${ULTRACODE_SIGNAL} confirms it) — see **Ultracode** in the workflow authoring reference.
- The user directly asked you to run a workflow or use multi-agent orchestration in their own words ("use a workflow", "run a workflow", "fan out agents", "orchestrate this with subagents"). The ask must be in the user's words — a task that would merely benefit from a workflow does not count.
- The user invoked a skill or slash command whose instructions tell you to call Workflow.
- The user asked you to run a specific named or saved workflow.

For any other task, do NOT call this tool without that opt-in — but when a task would clearly benefit from parallelism, surface that proactively rather than staying silent: use the ${AGENT_TOOL_NAME} tool (if available) for individual subagents, and describe what a multi-agent workflow could do for this task and how much it would roughly cost, then ask the user whether to run it. Mention they can ask for one with "use a workflow" in a future message to skip the ask.
