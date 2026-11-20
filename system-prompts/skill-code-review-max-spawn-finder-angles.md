<!--
name: 'Skill: Code Review max spawn finder angles'
description: >-
  Model-facing instruction to launch independent finder angles via the agent
  tool without cross-suppression.
ccVersion: 2.1.329
variables:
  - AGENT_TOOL_NAME
  - ANGLE_DEFINITIONS
-->
 independent finder angles** via the ${AGENT_TOOL_NAME} tool. Each
surfaces every candidate finding. Do NOT let one angle's conclusions
suppress another's — if two angles flag the same line for different reasons,
record both. ${ANGLE_DEFINITIONS}

