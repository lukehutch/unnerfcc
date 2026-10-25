<!--
name: 'Tool Result: Remote devices call did not connect computer'
description: >-
  Informs that the enable call did not connect a computer and to use existing
  remote-devices tools or report unavailable.
ccVersion: 2.1.310
variables:
  - TOOL_PREFIX
  - TOOL_SEARCH_TOOL
-->
This call did not connect a computer, and no tool here can. Tools whose names start with mcp__${TOOL_PREFIX}__, if you have any, run on the user's computer; use whichever of them fits the task, loading it with ${TOOL_SEARCH_TOOL} first, and waiting for that result, if it was only announced as available there and has not been loaded since. Otherwise carry on with the tools you have here, and if the task needs the user's computer, tell the user so.
