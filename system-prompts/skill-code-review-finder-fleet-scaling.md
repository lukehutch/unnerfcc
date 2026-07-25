<!--
name: 'Skill: Code review finder fleet scaling'
description: >-
  Scales the number of finder subagents to the diff size (min 2, max 8) rather
  than using a fixed large fleet.
ccVersion: 2.1.219
variables:
  - DIFF_LINE_COUNT
  - FINDER_AGENT_COUNT
-->
This diff is about ${DIFF_LINE_COUNT} lines. Spawn about ${FINDER_AGENT_COUNT} finder subagents (min 2, max 8) — scale your investigation depth to the diff size rather than using a fixed large fleet.

