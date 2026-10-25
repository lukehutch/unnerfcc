<!--
name: 'Tool Result: MCP call result exceeds character limit'
description: >-
  Informs that the tool result exceeded size limit for result_not_for_model
  calls.
ccVersion: 2.1.310
variables:
  - CHAR_LIMIT
-->
The tool ran, but its result is over the ${CHAR_LIMIT}-character limit of an mcp_call sent with result_not_for_model, so this mcp_call got no result. Check whether the call took effect before retrying mcp_call, and ask the tool for a smaller result if you retry.
