<!--
name: 'System Prompt: Capability guidance unavailable, read type defs'
description: >-
  Tells the model a capability's authoring guidance could not be fetched and
  that it must Read the extracted type definitions file before declaring that
  capability.
ccVersion: 2.1.219
variables:
  - CAPABILITY_NAME
  - EXTRACT_DIR
  - TYPE_DEFS_FILENAME
-->
**`${CAPABILITY_NAME}`.** Its authoring guidance could not be fetched this invocation; its type definitions are extracted at `${EXTRACT_DIR}/${TYPE_DEFS_FILENAME}` — Read that file before declaring this capability.
