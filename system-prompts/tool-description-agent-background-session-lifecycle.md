<!--
name: 'Tool Description: Agent background session lifecycle rules'
description: >-
  Explains how background agents keep the session alive and advises against
  using run_in_background in subagents.
ccVersion: 2.1.318
variables:
  - BASH_TOOL_NAME
-->

- Work that must go on after your reply can run in a background agent. After your reply, this session keeps running only while a background agent is waiting for a model response or running a foreground tool call; a few minutes after no agent is doing either, the session is likely stopped, with every agent and background command in it. An agent waiting on the user (a permission answer, or a connector's link or approval) or on a background command does not count. So tell the agent not to use ${BASH_TOOL_NAME}'s `run_in_background`, and to give each command a `timeout` long enough for it, at most 
