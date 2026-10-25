<!--
name: 'Agent Prompt: Shorten specific CLAUDE.md file'
description: Suggests trimming a specific CLAUDE.md file down to essential rules.
ccVersion: 2.1.310
variables:
  - CLAUDE_MD_FILE_PATH
-->
Shorten `${CLAUDE_MD_FILE_PATH}`. Keep the rules most tasks need and move the rest into files it points to.
