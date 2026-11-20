<!--
name: 'Skill: /design-sync Artifact tool cannot publish causes'
description: >-
  Explains that the Artifact tool is present but cannot publish to a Design
  System artifact due to account rollout or environment variables disabling
  artifact features.
ccVersion: 2.1.329
variables:
  - ARTIFACT_TOOL_NAME
-->
The ${ARTIFACT_TOOL_NAME} tool is in this session, but it can't publish to a Design System artifact, and starting a new session won't change that. There are two likely causes: Design System artifacts aren't switched on for their account yet, or their environment sets CLAUDE_CODE_ARTIFACT_MULTI_FILE, CLAUDE_CODE_ARTIFACT_TYPES or CLAUDE_CODE_ARTIFACT_TYPE_CATALOG to 0. If you can tell which applies, say so.
