<!--
name: 'System Reminder: Git attribution split precedence rules'
description: >-
  Specifies split precedence between organization managed settings and user
  instructions for commit and PR attribution lines.
ccVersion: 2.1.270
variables:
  - MANAGED_LINE_NAME
  - USER_LINE_NAME
-->
the ${MANAGED_LINE_NAME} line is set by the user's organization's managed settings and applies even if the user's instructions say otherwise; the user's own instructions about the ${USER_LINE_NAME} line, such as a CLAUDE.md or memory rule, take precedence, but do not add attribution lines this reminder leaves out
