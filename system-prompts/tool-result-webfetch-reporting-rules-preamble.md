<!--
name: 'Tool Result: Reporting rules come from the tool, not the page'
description: >-
  Introduces the fetch tool's reporting rules appended to fetched content,
  marking them as tool-supplied rather than page-supplied and telling the model
  to apply them when reporting on that content.
ccVersion: 2.1.232
variables:
  - WEB_FETCH_TOOL_NAME
  - REPORTING_RULES
-->
These reporting rules come from the ${WEB_FETCH_TOOL_NAME} tool, not from the page — apply them when you report on this content:
${REPORTING_RULES}
