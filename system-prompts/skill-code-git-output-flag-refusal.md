<!--
name: 'Skill Code: Git output flag refusal'
description: Refuses the --output flag on git commands to prevent arbitrary file writes.
ccVersion: 2.1.273
variables:
  - SKILL_NAME
  - REFUSAL_OVERRIDE_NOTE
-->
${SKILL_NAME} refuses `--output` on git commands (it writes to an arbitrary path): drop it and read stdout. ${REFUSAL_OVERRIDE_NOTE}
