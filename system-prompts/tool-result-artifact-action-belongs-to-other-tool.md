<!--
name: 'Tool Result: Action belongs to another tool'
description: >-
  Directs the model to load and call the correct tool for an action that was
  routed to the wrong tool.
ccVersion: 2.1.257
variables:
  - REQUESTED_ACTION
  - TARGET_TOOL
  - TARGET_ACTION
  - EXTRA_NOTE
  - SEARCH_TOOL
-->
action "${REQUESTED_ACTION}" is not part of this tool: that is the `${TARGET_TOOL}` tool's `action: "${TARGET_ACTION}"`${EXTRA_NOTE} — load it with ${SEARCH_TOOL} (query `select:${TARGET_TOOL}`) if it is not loaded yet, then call it there with the same fields.
