<!--
name: 'Tool Result: Truncated output preview guidance'
description: >-
  Informs the model that only a prefix of the result is shown below and
  instructs opening the saved file when the full result is needed.
ccVersion: 2.1.325
variables:
  - SHOWN_SIZE
  - READ_OR_SHELL_HINT
  - ADDITIONAL_NOTE
  - BOUNDARY_LINE
-->
 Only the first ${SHOWN_SIZE} is below. ${READ_OR_SHELL_HINT}${ADDITIONAL_NOTE}
Answer from what is below if it is enough. A summary or a count needs the whole result, so open the file for that. If you cannot open it, or your answer rests on only part of the result, say so.${BOUNDARY_LINE}
