<!--
name: 'Tool Parameter: REPL eval cancelled by status'
description: >-
  Describes the cancellation origin indicating whether an eval was stopped by a
  person or system event.
ccVersion: 2.1.318
-->
Set when the eval was cancelled before its script ran: 'person' when the turn was cut (usually by a person's Esc or Stop), 'other' when a script, a TaskStop call or Claude Code cancelled it. The error field then holds the text written for the model
