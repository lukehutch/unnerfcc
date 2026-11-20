<!--
name: 'Tool Result: Stopped task had unread messages'
description: >-
  Warns that a stopped task had not read the model's latest messages and advises
  repeating relevant instructions if resumed.
ccVersion: 2.1.329
variables:
  - STOP_STATUS_TEXT
-->
${STOP_STATUS_TEXT} It had not read your latest messages. If you resume it, repeat what still applies.
