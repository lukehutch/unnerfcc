<!--
name: 'Tool Result: Content elided summary'
description: >-
  Displays truncated content with the head, character count of elided text, and
  tail.
ccVersion: 2.1.329
variables:
  - HEAD_OUTPUT
  - ELIDED_CHARS
  - TAIL_SEPARATOR
  - TAIL_OUTPUT
-->
${HEAD_OUTPUT}
... [${ELIDED_CHARS} chars elided] ...${TAIL_SEPARATOR}${TAIL_OUTPUT}
