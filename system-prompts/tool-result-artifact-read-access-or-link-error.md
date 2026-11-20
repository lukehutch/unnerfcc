<!--
name: 'Tool Result: Artifact read access or link error hint'
description: >-
  Explains that a read failure usually indicates an invalid artifact link or
  missing access and suggests listing artifacts with scope all.
ccVersion: 2.1.329
variables:
  - ARTIFACT_TOOL_NAME
-->
. On a read this is almost always the artifact's link or this account's access to it, because a missing collection or document normally comes back empty. The ${ARTIFACT_TOOL_NAME} tool's "list" action with scope "all" shows the links of the user's artifacts; access is changed by someone who can share the artifact
