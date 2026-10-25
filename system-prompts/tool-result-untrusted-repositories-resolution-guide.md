<!--
name: 'Tool Result: Untrusted repositories resolution guide'
description: >-
  Comprehensive resolution guide for resolving untrusted repository blocks on
  remote machines.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
  - TOOL_CALL_1
  - TOOL_CALL_2
-->
This session has repositories or files attached that its owner has not said they trust, so its calls to ${MACHINE_NAME} are not accepted. Nothing was done for this one. Sending the same call again will not change that. Call ${TOOL_CALL_1} once. If it refuses with a trust question, put the question to the person: their yes clears this. If it lists folders, call ${TOOL_CALL_2} for the folder this session was using: the person's Allow clears this. If you have neither tool, if neither asks the person anything, or if ${MACHINE_NAME} still refuses after their answer, tell them plainly what stays blocked, and that a new session with no repository and none of their files can run a quick command.
