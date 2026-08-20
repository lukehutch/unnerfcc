<!--
name: 'System Reminder: Relay to the @-mentioned session with SendMessage'
description: >-
  Clause of the resolved @-mention reminder telling the model to address the
  matched Claude session with the send-message tool when the user's message asks
  it to tell or ask that session something.
ccVersion: 2.1.232
variables:
  - SEND_MESSAGE_TOOL_REFERENCE
-->
. If their message asks you to tell or ask that session something, use ${SEND_MESSAGE_TOOL_REFERENCE} with to: "
