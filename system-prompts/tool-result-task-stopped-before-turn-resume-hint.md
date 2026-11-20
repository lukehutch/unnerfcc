<!--
name: 'Tool Result: Task stopped before turn, resume from transcript'
description: >-
  Informs the model that a task stopped before the current turn and should only
  be resumed via message from its saved transcript if the user asks.
ccVersion: 2.1.329
variables:
  - STOP_STATUS_TEXT
-->
${STOP_STATUS_TEXT} The stop came before this turn began. Do not start it again unless the user asks. If the user asks, send it a message to resume it from its saved transcript.
