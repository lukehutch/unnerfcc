<!--
name: 'Tool Result: First publish requires session_context'
description: >-
  Tells the model this artifact's first publish requires session_context and
  names what that context must cover.
ccVersion: 2.1.231
variables:
  - SESSION_CONTEXT_REQUIREMENTS
-->
This is the first publish of this artifact, so `session_context` is required. Re-run the publish with a session_context covering: ${SESSION_CONTEXT_REQUIREMENTS}.
