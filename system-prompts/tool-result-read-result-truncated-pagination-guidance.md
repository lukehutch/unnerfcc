<!--
name: 'Tool Result: Read result truncated pagination guidance'
description: >-
  Provides pagination parameters for fetching the next page of a truncated read
  result.
ccVersion: 2.1.310
variables:
  - CUT_LINE
  - READ_TOOL
-->
 arrived whole, line ${CUT_LINE} may be cut short, and the rest of the file is not in this result. The next page is ${READ_TOOL} with offset=${CUT_LINE} limit=
