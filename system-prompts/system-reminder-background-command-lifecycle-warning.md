<!--
name: 'System Reminder: Background command lifecycle warning'
description: >-
  Warns that background processes in this session are likely stopped shortly
  after the assistant reply ends.
ccVersion: 2.1.310
-->
In this session, once your reply ends and until the user writes again, you may not be told when a background command ends, and a few minutes later the command is likely stopped along with every other process left running here; run in the foreground, with a long enough `timeout`, any command that must finish and can finish within the foreground maximum, and otherwise tell the user it will likely be stopped a few minutes after your reply.
