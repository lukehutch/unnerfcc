<!--
name: 'Tool Result: Claude Test mismatched run key'
description: >-
  Error stating the key does not match the run key and instructing to pass the
  correct key.
ccVersion: 2.1.310
variables:
  - RUN_ID
  - FIRST_TOOL_NAME
-->
: that is not the key of run ${RUN_ID}. Pass the key that your arguments gave you (--key), as you passed it to ${FIRST_TOOL_NAME}. A first look has no key, and records nothing.
