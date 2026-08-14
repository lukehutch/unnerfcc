<!--
name: 'Tool Parameter: Background command owned by a synchronous subagent'
description: >-
  Describes the flag marking a backgrounded command as owned by a synchronous
  subagent, so it is terminated when that agent gives its final response.
ccVersion: 2.1.231
-->
True when this backgrounded command is owned by a synchronous subagent and is therefore terminated when that agent gives its final response; absent when the command survives (main loop, async subagents)
