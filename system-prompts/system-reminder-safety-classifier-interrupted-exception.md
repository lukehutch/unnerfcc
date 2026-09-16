<!--
name: 'System Reminder: Safety classifier interrupted tool exception'
description: >-
  Clarifies that tool calls marked interrupted were already running when the
  safety classifier triggered and may have completed.
ccVersion: 2.1.273
-->
 Exception: a tool call whose result reads "Interrupted" was already running when the response was stopped; it may have partially or fully completed.
