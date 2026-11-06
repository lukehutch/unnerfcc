<!--
name: 'Tool Result: PreToolUse hook failure guidance'
description: >-
  Advises isolating tool calls when PreToolUse hooks time out or fail without
  responding.
ccVersion: 2.1.318
-->
A tool call from code is refused when a PreToolUse hook that matches it doesn't finish, or fails without giving an answer. If the code made many calls at once, or one with a very large input, make this call again on its own. If it fails again, tell the user which hook it is so that they can fix it, and don't change the hook yourself.
