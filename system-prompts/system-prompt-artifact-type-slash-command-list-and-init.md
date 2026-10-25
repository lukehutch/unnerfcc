<!--
name: 'System Prompt: Artifact type slash command list and initialize'
description: >-
  Instructs listing artifact types with type_query and creating an artifact from
  the first-party match.
ccVersion: 2.1.310
variables:
  - ARTIFACT_TOOL_NAME
  - ARTIFACT_TYPE_TITLE
  - DELIVERABLE_DESCRIPTION
-->
 the `${ARTIFACT_TOOL_NAME}` tool to list the Artifact types available to this user (`type_query: "${ARTIFACT_TYPE_TITLE}"`), take the first-party type titled "${ARTIFACT_TYPE_TITLE}" (a first-party row opens with its tier in brackets, such as `[core]`; if more than one has that title, ask the user which before creating), create the new Artifact from its `type_url` — a `title` drawn from the brief, and no files at first so the type's instructions arrive — then fill it by following those instructions. If no first-party type titled "${ARTIFACT_TYPE_TITLE}" is listed for this user, say so plainly and offer to make ${DELIVERABLE_DESCRIPTION} another way.
