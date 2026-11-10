<!--
name: 'Tool Result: Connector call missing conversation messages refused'
description: >-
  Refuses connector calls provided without conversation messages because
  parameter file mappings cannot be checked.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called. Claude Code was given this call without the conversation's messages, so it could not read the tool definitions saved in this conversation and cannot tell which connector arguments it asked you to fill with file paths. While that is so, it refuses connector calls that have text in an argument, even inside a list or object, and calls that have an argument ${TOOL_NAME} does not list. The one exception is a local file's path in an argument for which Claude Code, or the app that runs it, sends the file. The connector is not at fault, and a new conversation will not help. Tell the user that the fault is in Claude Code or in the program that runs Claude Code.
