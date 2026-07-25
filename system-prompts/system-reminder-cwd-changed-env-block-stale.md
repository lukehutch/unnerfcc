<!--
name: 'System Reminder: Working directory changed (env block stale)'
description: >-
  Warns that the environment block still names the previous directory and that
  all tool calls and relative paths now resolve from the new one.
ccVersion: 2.1.219
variables:
  - NEW_WORKING_DIRECTORY
-->
). The environment block at the start of this conversation still names the previous directory — that information is stale. All tool calls and relative paths now resolve from ${NEW_WORKING_DIRECTORY}.
