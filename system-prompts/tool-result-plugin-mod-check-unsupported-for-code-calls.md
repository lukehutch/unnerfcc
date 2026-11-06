<!--
name: 'Tool Result: Plugin mod check unsupported for code calls'
description: >-
  Explains that inspecting mod plugins with JavaScript hooks is unsupported for
  tool calls made by code.
ccVersion: 2.1.318
variables:
  - ENVIRONMENT_NAME
  - ALTERNATIVE_ACTION
-->
This call was not made. Claude Code could not find out whether an installed plugin is a mod (a plugin with JavaScript hooks) that checks tool calls, and ${ENVIRONMENT_NAME} does not yet support that for a tool call that your code makes. Do not look for another way to do the same thing. Tell the user that they can try again, ${ALTERNATIVE_ACTION}
