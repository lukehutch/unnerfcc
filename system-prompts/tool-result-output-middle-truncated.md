<!--
name: 'Tool Result: Output middle truncated'
description: >-
  Elides the middle portion of an output that exceeded character retention
  limits.
ccVersion: 2.1.318
variables:
  - HEAD_OUTPUT
  - ELIDED_CHARS
  - CONTENT_TYPE
  - TAIL_OUTPUT
-->
${HEAD_OUTPUT}
… [${ELIDED_CHARS} characters of this ${CONTENT_TYPE} were not kept] …
${TAIL_OUTPUT}
