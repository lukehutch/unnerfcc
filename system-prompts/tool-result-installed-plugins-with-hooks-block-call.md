<!--
name: 'Tool Result: Installed plugins with hooks block call'
description: >-
  Explains that installed plugins with hooks cannot check code tool calls and
  suggests disabling them via /plugin.
ccVersion: 2.1.318
variables:
  - PLUGIN_DESCRIPTION
  - ENVIRONMENT_NAME
  - PLUGIN_NAMES
  - ALTERNATIVE_ACTION
-->
This call was not made. ${PLUGIN_DESCRIPTION} that may check tool calls, and ${ENVIRONMENT_NAME} does not yet support that for a tool call that your code makes. Do not look for another way to do the same thing. Tell the user that they can disable ${PLUGIN_NAMES} with /plugin and go on here, ${ALTERNATIVE_ACTION}
