<!--
name: 'Tool Result: Claude Test pass matching run key'
description: Instructs passing the exact run key passed to the initial tool call.
ccVersion: 2.1.310
variables:
  - INITIAL_TOOL_NAME
-->
. Pass the key that your arguments gave you (--key), as you passed it to ${INITIAL_TOOL_NAME}. This tool serves your own run only.
