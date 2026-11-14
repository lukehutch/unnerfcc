<!--
name: 'Tool Result: Disallowed unicode escape error'
description: >-
  Error message explaining that a disallowed unicode escape was found in the
  tool input and instructing how to fix it before retrying.
ccVersion: 2.1.325
variables:
  - ESCAPE_SEQUENCE
  - ESCAPE_CONTEXT_GUIDANCE
  - ESCAPE_FIX_INSTRUCTIONS
-->
 holds the escape ${ESCAPE_SEQUENCE}. ${ESCAPE_CONTEXT_GUIDANCE} ${ESCAPE_FIX_INSTRUCTIONS} Check the rest of the input too: no \uXXXX escape may stand in a URL or a domain, nor elsewhere one from \u0020 to \u007e, \u2028 or \u2029. Then make the call again.
