<!--
name: 'Tool Result: Connector extra request unsupported'
description: >-
  Informs the model that the connector asked for additional input that Claude
  Code does not answer during a file-sending call.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
  - EXTRA_NOTE
-->
, the connector asked for something more, which Claude Code does not answer in a call that sends files, so ${TOOL_NAME} did not finish.${EXTRA_NOTE} Tell the user before 
