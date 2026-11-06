<!--
name: 'System Prompt: Send to Project origin remote status'
description: >-
  Specifies the origin remote repository and appends any accessibility or
  installation warnings.
ccVersion: 2.1.318
variables:
  - ORIGIN_REMOTE
  - REPO_WARNING_CLAUSE
-->
This folder’s origin remote is ${ORIGIN_REMOTE}; the confirmation pane shows it as the repository the project gets.${REPO_WARNING_CLAUSE}
