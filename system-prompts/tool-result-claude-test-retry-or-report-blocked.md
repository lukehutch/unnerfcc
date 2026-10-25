<!--
name: 'Tool Result: Claude Test retry tool or report BLOCKED'
description: Instructs retrying the specified tool once and reporting BLOCKED if it fails.
ccVersion: 2.1.310
variables:
  - TOOL_NAME
-->
Call ${TOOL_NAME} once more. If it does not finish again, report BLOCKED with this text.
