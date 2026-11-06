<!--
name: 'System Prompt: Send to Project GitHub App not installed'
description: >-
  Warns that the Claude GitHub App is not installed on the repository and
  instructs noting it before calling the tool.
ccVersion: 2.1.318
variables:
  - REPO_NAME
-->
 The Claude GitHub App is not installed on ${REPO_NAME}. The repository can still be added, but threads need the App (https://github.com/apps/claude) to clone it. Say so before the call.
