<!--
name: 'Tool Result: ToolSearch Schema Missing Guidance'
description: >-
  Error tool_result telling the model the tool's schema wasn't sent to the API
  and to load it via ToolSearch select:<name> before retrying.
ccVersion: 2.1.219
variables:
  - TOOL_SEARCH_TOOL_NAME
-->


This tool's schema was not sent to the API — it was not in the discovered-tool set derived from message history. Without the schema in your prompt, typed parameters (arrays, numbers, booleans) get emitted as strings and the client-side parser rejects them. Load the tool first: call ${TOOL_SEARCH_TOOL_NAME} with query "select:
