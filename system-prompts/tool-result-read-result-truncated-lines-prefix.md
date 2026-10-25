<!--
name: 'Tool Result: Read result truncated lines prefix'
description: Prefix explaining that the read tool truncated results to line limits.
ccVersion: 2.1.310
variables:
  - READ_TOOL
  - START_LINE
-->
(${READ_TOOL} cut this result at the most it sends in one answer: lines ${START_LINE}-
