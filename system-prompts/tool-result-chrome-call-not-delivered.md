<!--
name: 'Tool Result: Chrome call not delivered'
description: >-
  Informs that a browser tool call was not delivered to the Chrome extension
  because the machine may be asleep or offline.
ccVersion: 2.1.270
variables:
  - TOOL_NAME
-->
The "${TOOL_NAME}" call was never delivered to the Chrome extension: the computer running that browser appears to be offline or asleep, or Chrome is not running there. This is a connection problem, not a permission or site-access issue. Ask the user to make sure that computer is awake and Chrome is open with the Claude extension, then retry.
