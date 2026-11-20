<!--
name: 'Skill: /design-sync Artifact tool not available'
description: >-
  Explains that the Artifact tool used by /design-sync is unavailable in this
  session and lists the account, config, permission, and organization
  requirements for it.
ccVersion: 2.1.329
variables:
  - ARTIFACT_TOOL_NAME
-->
The ${ARTIFACT_TOOL_NAME} tool, which /design-sync publishes with, is not available in this session. As a rule it is available in a session on the user's own machine that is signed in with claude.ai on a paid plan, has Artifacts on in /config, has no /permissions rule that denies the tool, and whose organization allows artifacts. Once that holds, they can start a new session and run /design-sync again; if it all holds already, the cause is a rarer one that this list leaves out.
