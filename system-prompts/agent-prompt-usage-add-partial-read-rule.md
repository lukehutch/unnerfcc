<!--
name: 'Agent Prompt: Add rule against reading large file whole'
description: Suggests adding a rule to CLAUDE.md to avoid reading a large file in full.
ccVersion: 2.1.310
variables:
  - CLAUDE_MD_FILE_PATH
  - TARGET_FILE_PATH
-->
Add a rule to `${CLAUDE_MD_FILE_PATH}`: never read `${TARGET_FILE_PATH}` whole. Search it, or read only the lines you need.
