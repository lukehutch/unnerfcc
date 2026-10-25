<!--
name: 'Tool Result: Hook input change refused in session'
description: >-
  Informs the model that a hook tried to modify a tool call's input, which is
  refused in this session, and to proceed without the call.
ccVersion: 2.1.310
-->
A hook from the user's own Claude Code files tried to change this tool call's input. In this session such hooks may block or ask about a call but not change it, so the call was not made. Retrying will not help while the hook keeps changing the input: go on without this call, and tell the user their hook's change to it was refused.
