<!--
name: 'System Prompt: Invalid JSON response retry'
description: >-
  Retry prompt re-issuing the original request after an unparseable answer,
  demanding only the JSON object and nothing else.
ccVersion: 2.1.219
variables:
  - ORIGINAL_PROMPT
-->
${ORIGINAL_PROMPT}

Previous response was not valid JSON. Respond with ONLY the JSON object, nothing else.
