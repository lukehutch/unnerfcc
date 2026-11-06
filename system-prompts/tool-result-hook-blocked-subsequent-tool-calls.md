<!--
name: 'Tool Result: Hook blocked subsequent tool calls'
description: >-
  Explains that a hook returned continue false, preventing further tool calls
  from the code.
ccVersion: 2.1.318
-->
This tool call did not run. A hook returned continue: false for another tool call from the same piece of code, so every further tool call from it is refused. The hook's reason is sent with that code's result.
