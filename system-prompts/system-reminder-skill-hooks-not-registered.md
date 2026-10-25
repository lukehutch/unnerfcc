<!--
name: 'System Reminder: Skill hooks not registered'
description: >-
  Warns that declared skill hooks and allowed-tools were not registered in this
  session and advises informing the user.
ccVersion: 2.1.310
-->
This skill declares hooks, and they were not registered in this session: a limit on hooks, a matcher that cannot be tested here, or the organization's policy kept them out. The tools that its allowed-tools would grant were not granted either. If the skill relies on its hooks to check or block tool calls, nothing checks them now: tell the user.
