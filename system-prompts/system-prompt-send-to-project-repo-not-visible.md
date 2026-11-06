<!--
name: 'System Prompt: Send to Project repo not visible'
description: >-
  Warns that the user's Claude account cannot see the repository and instructs
  stating this before calling the tool.
ccVersion: 2.1.318
variables:
  - REPO_NAME
-->
 Their Claude account cannot see ${REPO_NAME} (the GitHub account connected at claude.ai may differ). The repository can still be added, but threads cannot clone it until that is fixed. Say so before the call.
