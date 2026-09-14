<!--
name: 'Agent Prompt: Claude Design interactive command guidance'
description: >-
  Explains that /design subcommands require an interactive terminal signed in to
  claude.ai.
ccVersion: 2.1.270
variables:
  - SUBCOMMAND
-->
`/design ${SUBCOMMAND}` is for the user to type themselves, in an interactive Claude Code terminal signed in to claude.ai; if they already did, this session does not offer it (organization policy or sign-in). Say so in one line and stop.
