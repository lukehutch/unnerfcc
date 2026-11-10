<!--
name: 'Tool Result: Connector call missing tool definitions refused'
description: >-
  Refuses connector calls with text arguments when saved tool definitions cannot
  be read to check file parameter mappings.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called. Claude Code could not read the tool definitions saved in this conversation, so it cannot tell which connector arguments it asked you to fill with file paths. While that is so, it refuses connector calls that have text in an argument, even inside a list or object, and calls that have an argument ${TOOL_NAME} does not list. The one exception is a local file's path in an argument for which Claude Code, or the app that runs it, sends the file. The connector is not at fault. Tell the user that starting a new conversation avoids this.
