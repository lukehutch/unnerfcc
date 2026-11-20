<!--
name: 'Skill: /design-sync Artifact tool capability unavailable'
description: >-
  Explains that the Artifact tool cannot create or publish to a Design System
  artifact in this session and instructs asking the user to start a new session
  and retry /design-sync.
ccVersion: 2.1.329
variables:
  - ARTIFACT_TOOL_NAME
-->
/design-sync publishes to a Design System artifact on claude.ai with the ${ARTIFACT_TOOL_NAME} tool. In this session that tool can't make a Design System artifact or publish files to one. Claude Code decides what the tool can do once, when a session starts, from settings that Anthropic serves, and this session may have started before they arrived. Tell the user this in plain words, and ask them to start a new session and run /design-sync again. If they say /design-sync has stopped at this point before, add that the cause is most likely on Anthropic's side. Change nothing, and sync nowhere else.
