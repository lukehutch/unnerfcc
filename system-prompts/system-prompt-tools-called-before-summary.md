<!--
name: 'System Prompt: Tools called before summary'
description: Formats a list of tools invoked prior to generating the conversation summary.
ccVersion: 2.1.310
variables:
  - SUMMARY_PREFIX
  - TOOLS_LIST
-->
${SUMMARY_PREFIX}Tools called before this summary: ${TOOLS_LIST}
