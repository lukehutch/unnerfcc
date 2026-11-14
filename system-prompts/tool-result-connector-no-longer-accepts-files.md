<!--
name: 'Tool Result: Connector no longer accepts files'
description: >-
  Informs the model that the connector connection changed after tool listing and
  can no longer accept files.
ccVersion: 2.1.325
variables:
  - RETRY_GUIDANCE
  - EXTRA_NOTE
-->
The connection to this connector changed after its tools were listed, and it can no longer take files, so the call could not go on. ${RETRY_GUIDANCE}${EXTRA_NOTE}
