<!--
name: 'Tool Description: URL fetch fallback guidance'
description: Advises which tool to use when a URL fetch request is refused.
ccVersion: 2.1.310
variables:
  - FALLBACK_TOOL_NAME
  - REFUSED_TOOL_NAME
-->
 Where it refuses one, use ${FALLBACK_TOOL_NAME}, not ${REFUSED_TOOL_NAME}.
