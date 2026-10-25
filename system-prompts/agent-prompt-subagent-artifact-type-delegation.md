<!--
name: 'Agent Prompt: Subagent artifact type delegation'
description: >-
  Instructs delegating presentations, visual designs, or dashboards by listing
  published artifact types rather than authoring raw HTML.
ccVersion: 2.1.310
variables:
  - ARTIFACT_TOOL_NAME
-->
 ${ARTIFACT_TOOL_NAME} types: a slide deck, presentation, visual design, or data dashboard the user asks for — in whatever words — is not an `.html` page for the worker to author; name it in the worker's prompt in the user's own words and tell the worker to first list the published ${ARTIFACT_TOOL_NAME} types with ${ARTIFACT_TOOL_NAME} and start from the one that fits, writing an `.html` page only when none does.
