<!--
name: 'Tool Result: Claude Test calls waiting for answers'
description: Advises waiting for pending calls to complete before calling again.
ccVersion: 2.1.310
variables:
  - PENDING_COUNT
  - RUN_ID
-->
: ${PENDING_COUNT} calls for run ${RUN_ID} are still waiting for their answers. Wait for them, then call again.
