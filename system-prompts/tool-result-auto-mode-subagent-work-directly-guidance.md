<!--
name: 'Tool Result: Auto mode subagent work directly guidance'
description: >-
  Advises performing work directly using Promise.all or asking the user to leave
  auto mode via Shift+Tab if a sub-agent is necessary.
ccVersion: 2.1.321
-->
Do the work yourself: one piece of code can make several calls at once with Promise.all. If the task really needs a sub-agent, tell the user that they can leave auto mode with Shift+Tab, for example for Manual mode, and then ask you to try again.
