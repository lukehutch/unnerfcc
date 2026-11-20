<!--
name: 'Tool Result: Session unreachable suffix'
description: >-
  Tool result suffix explaining that the target session may have ended,
  restarted, or had a wrong ID, and directing the model to call ListAgents.
ccVersion: 2.1.329
variables:
  - LIST_AGENTS_TOOL_NAME
-->
 — that session may have ended or restarted, or the id may be wrong. Call ${LIST_AGENTS_TOOL_NAME} to see who is reachable now.
