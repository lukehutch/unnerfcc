<!--
name: 'Tool Result: Artifact published URL footer'
description: Appends the published artifact URL to the tool result.
ccVersion: 2.1.325
variables:
  - TOOL_RESULT_BODY
  - ARTIFACT_URL
-->
${TOOL_RESULT_BODY}

The artifact this call published: ${ARTIFACT_URL} .
