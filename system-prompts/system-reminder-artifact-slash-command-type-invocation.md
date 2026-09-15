<!--
name: 'System Reminder: Slash command invoked for artifact from type'
description: >-
  Instructs the model how to proceed when a slash command requests a new
  artifact from a published artifact type.
ccVersion: 2.1.272
variables:
  - COMMAND_NAME
  - REQUEST_BRIEF
  - TYPE_TITLE
  - TOOL_NAME
  - INTENT
-->
`/${COMMAND_NAME}` was invoked: a request for ${REQUEST_BRIEF} made as a NEW Artifact from the published Artifact type titled "${TYPE_TITLE}". Call the `${TOOL_NAME}` tool with `action: "quickstart"` and `intent: "${INTENT}"` (adding `design_systems: false` if you already have a design system's link or the user declined one), then do what its result says: create the new Artifact from the type it names — a `title` drawn from the brief, and no files at first so the type's instructions arrive — and fill it by following those instructions. If it says no such type is listed for this user, say so plainly, then do what it says instead.
