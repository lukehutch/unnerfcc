<!--
name: 'System Reminder: Working directory changed settings retained'
description: >-
  Model-facing reminder that project settings, MCP servers, and skills still
  load from the launch directory rather than the new directory.
ccVersion: 2.1.325
variables:
  - LAUNCH_DIRECTORY
  - NEW_WORKING_DIRECTORY
-->
Project settings (permission rules, hooks), project MCP servers, and project skills still come from ${LAUNCH_DIRECTORY}, where this session was launched, and not from ${NEW_WORKING_DIRECTORY}, whose CLAUDE.md, if any, follows below.
