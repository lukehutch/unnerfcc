<!--
name: 'Tool Result: Subagent not started due to schema error'
description: >-
  Informs that a subagent was not started due to a schema error and instructs to
  fix the schema and call agent() again.
ccVersion: 2.1.263
variables:
  - ERROR_LABEL
  - ERROR_DETAILS
-->
${ERROR_LABEL}: ${ERROR_DETAILS}. The subagent was not started — fix the schema and call agent() again.
