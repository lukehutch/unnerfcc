<!--
name: 'Tool Result: Stopped agent requires Claude app user message to resume'
description: >-
  Informs the model that a stopped agent can only be resumed in response to a
  post-Stop message typed by the user in the Claude app.
ccVersion: 2.1.329
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID} ended when the user pressed Stop, and was not resumed. It can be resumed only in answer to a message that the user types in the Claude app (web, desktop or mobile) after the Stop. This turn answers no such message, so its work stays stopped until the user asks for it there.
