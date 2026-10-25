<!--
name: 'Tool Result: Claude Test address path display overflow'
description: >-
  Reports that the address and project path exceed available dialog display
  lines.
ccVersion: 2.1.310
variables:
  - ADDRESS
  - MAX_LINES
-->
Nothing was asked: ${ADDRESS} and the project folder's path together cannot be shown whole in the question. Claude Code shows at most ${MAX_LINES} lines of it, and the question for this address has no spare line for a path on two lines. So ${ADDRESS} cannot be allowed for this project. Tell the person; the project would have to sit at a path of at most 
