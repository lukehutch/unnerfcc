<!--
name: 'Tool Result: Hook plugin provenance'
description: Appends the source plugin name to a hook execution verdict or error message.
ccVersion: 2.1.310
variables:
  - MESSAGE
  - PLUGIN_NAME
-->
${MESSAGE}
This hook comes from the ${PLUGIN_NAME} plugin.
