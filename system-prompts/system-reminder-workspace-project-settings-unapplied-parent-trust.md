<!--
name: 'System Reminder: Project settings unapplied under parent trust'
description: >-
  Warns that project permission rules and directories are not applied because
  trust was granted through a parent directory rather than explicitly.
ccVersion: 2.1.251
variables:
  - PROJECT_DIRECTORY
-->
Note: ${PROJECT_DIRECTORY} declares project permission rules and/or additional directories in its settings, but they are NOT applied — the workspace is trusted only through a parent directory's grant, and project-scoped grants require trusting this directory explicitly. Tool calls those rules would have pre-approved will ask for permission.
