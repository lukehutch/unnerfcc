<!--
name: 'Tool Result: Call blocked without permission prompt UI'
description: >-
  Informs the model that the tool call did not run because it requires a user
  answer and this context cannot show a permission prompt.
ccVersion: 2.1.329
variables:
  - FALLBACK_GUIDANCE
-->
This call did not run: it needs the user's answer, and this context cannot show a permission prompt. ${FALLBACK_GUIDANCE}
