<!--
name: 'System Prompt: Agent thread cwd reset requires absolute paths'
description: >-
  Instructs agent threads to use absolute paths because the current working
  directory resets between bash calls.
ccVersion: 2.1.310
-->
- Agent threads always have their cwd reset between bash calls, so please remember to only use absolute file paths.
