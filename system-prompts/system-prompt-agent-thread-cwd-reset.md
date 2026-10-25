<!--
name: 'System Prompt: Agent thread cwd reset'
description: >-
  Reminds agent threads that working directory resets between bash calls so
  absolute file paths must be used.
ccVersion: 2.1.310
-->
- Agent threads always have their cwd reset between bash calls, as a result please only use absolute file paths.
