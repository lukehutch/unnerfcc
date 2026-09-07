<!--
name: 'Tool Result: Unapprovable here use read_file for published bytes'
description: >-
  States approval cannot be given here and recommends read_file to get published
  bytes.
ccVersion: 2.1.263
variables:
  - TOOL_NAME
-->
only on an approval that cannot be given from here; the ${TOOL_NAME} tool's read_file action saves the published bytes instead
