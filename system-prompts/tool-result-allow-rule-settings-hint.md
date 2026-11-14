<!--
name: 'Tool Result: Allow rule settings.local.json hint'
description: >-
  Informs the model of the exact permission allow rule the user can add to
  .claude/settings.local.json to avoid future prompts.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
  - ALLOW_RULE_PATTERN
-->
. The user can add the allow rule ${TOOL_NAME}(${ALLOW_RULE_PATTERN}) to .claude/settings.local.json to let it run without asking.
