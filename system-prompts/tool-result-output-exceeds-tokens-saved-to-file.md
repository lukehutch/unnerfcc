<!--
name: 'Tool Result: Output exceeds token limit, saved to file'
description: >-
  Reports that the result exceeded the allowed tokens and names the file the
  output was saved to and its format.
ccVersion: 2.1.325
variables:
  - RESULT_TOKEN_COUNT
  - OUTPUT_FILE_PATH
  - OUTPUT_FORMAT
-->
Error: result (${RESULT_TOKEN_COUNT}) exceeds maximum allowed tokens. Output has been saved to ${OUTPUT_FILE_PATH}.
Format: ${OUTPUT_FORMAT}
