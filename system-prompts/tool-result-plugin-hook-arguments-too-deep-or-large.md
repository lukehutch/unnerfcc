<!--
name: 'Tool Result: Plugin hook arguments too deep or large'
description: >-
  Explains that a tool call was blocked because arguments exceeded depth or size
  limits for plugin hooks.
ccVersion: 2.1.318
variables:
  - MAX_DEPTH
  - MAX_VALUES
-->
 was not called, because its arguments are too deep or too large for the plugin hooks that check this tool's calls: they are nested more than ${MAX_DEPTH} levels deep, have more than ${MAX_VALUES} values, or contain themselves. Pass a smaller, flatter value, or split it over several calls.
