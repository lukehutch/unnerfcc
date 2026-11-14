<!--
name: 'Tool Parameter: SendUserFile status (proactive reaches phone)'
description: >-
  Describes the status parameter for SendUserFile, explaining when to use
  proactive versus normal.
ccVersion: 2.1.325
-->
Set `status` on every call. Use `proactive` when you're initiating — the user is away and you want this to reach their phone (build artifact ready, report generated). Use `normal` when replying to something the user just said.
