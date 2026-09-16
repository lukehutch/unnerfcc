<!--
name: 'Agent Prompt: Subagent artifact type delegation'
description: >-
  Instructs delegating presentations or visual designs by listing published
  artifact types rather than authoring raw HTML.
ccVersion: 2.1.273
variables:
  - ARTIFACT_TYPE
-->
 ${ARTIFACT_TYPE} types: a slide deck, presentation, or visual design the user asks for — in whatever words — is not an `.html` page for the worker to author; name it in the worker's prompt in the user's own words and tell the worker to first list the published ${ARTIFACT_TYPE} types with ${ARTIFACT_TYPE} and start from the one that fits, writing an `.html` page only when none does.
