<!--
name: 'Tool Result: Pin action requires URL parameter'
description: Validation error stating pin/unpin requires the artifact's URL parameter.
ccVersion: 2.1.263
variables:
  - ACTION_NAME
-->
action "${ACTION_NAME}" requires `url` — the artifact's claude.ai URL (the publish result has it; action: "list" shows earlier ones).
