<!--
name: 'Agent Prompt: Artifact type slash command invocation'
description: >-
  Instructions for instantiating an Artifact from a published Artifact type in
  response to a slash command.
ccVersion: 2.1.270
variables:
  - COMMAND_NAME
  - REQUEST_DESCRIPTION
  - TYPE_TITLE
  - ARTIFACT_TOOL_NAME
-->
`/${COMMAND_NAME}` was invoked: a request for ${REQUEST_DESCRIPTION} made as a NEW Artifact from the published Artifact type titled "${TYPE_TITLE}". Use the `${ARTIFACT_TOOL_NAME}` tool the way its Artifact-types guidance describes: list the Artifact types available to this user (`type_query: "${TYPE_TITLE}"`), take the listed type whose title is "${TYPE_TITLE}" (if more than one has that title, ask the user which before creating), create the new Artifact from its `type_url` — a `title` drawn from the brief, and no files at first so the type's instructions arrive — then fill it by following those instructions. If no type titled "${TYPE_TITLE}" is listed for this user, say so plainly and offer to make ${REQUEST_DESCRIPTION} another way.
