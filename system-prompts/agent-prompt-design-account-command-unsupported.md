<!--
name: 'Agent Prompt: Claude Design account command unsupported notice'
description: >-
  Advises that Claude Design account/project commands are not supported in this
  session.
ccVersion: 2.1.270
variables:
  - COMMAND_NAME
-->
"${COMMAND_NAME}" is a Claude Design account or project command, not a brief, and this session does not offer it (for import, export or status, claude.ai/design is the place). Tell the user that in one line and stop — do not make anything named "${COMMAND_NAME}".
