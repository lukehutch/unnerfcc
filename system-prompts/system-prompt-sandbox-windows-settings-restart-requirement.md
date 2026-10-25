<!--
name: 'System Prompt: Sandbox Windows settings restart requirement'
description: >-
  Notes that sandbox settings changes on Windows require restarting Claude Code
  and specific services at the user's discretion.
ccVersion: 2.1.310
variables:
  - SERVICE_OR_ACTION
-->
 (a project's settings do not count on Windows), after which ${SERVICE_OR_ACTION} and Claude Code has to be restarted; that is their decision, not yours.
