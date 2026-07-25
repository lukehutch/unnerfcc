<!--
name: 'Skill: Code Review (no fan-out fallback)'
description: >-
  Tells the reviewer to work every angle inline in one pass when the Agent tool
  is unavailable, re-checking each candidate against the diff.
ccVersion: 2.1.219
variables:
  - AGENT_TOOL_NAME
-->
The ${AGENT_TOOL_NAME} tool isn't available in this context, so the usual
multi-agent fan-out and subagent verify pass can't run. Work through every
angle below yourself, in this same context, in one pass — do not skip angles
for lack of fan-out. Re-check each candidate against the diff before keeping
it; drop anything you can't back up with a concrete failure scenario.
