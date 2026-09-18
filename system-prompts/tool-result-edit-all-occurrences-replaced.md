<!--
name: Edit all-occurrences replaced result
description: >-
  Edit tool_result content sent to the model confirming the file was updated and
  all occurrences were successfully replaced; model-facing.
ccVersion: 2.1.277
variables:
  - FILE_PATH
  - SUFFIX_1
  - SUFFIX_2
  - SUFFIX_3
-->
The file ${FILE_PATH} has been updated${SUFFIX_1}. All occurrences were successfully replaced.${SUFFIX_2}${SUFFIX_3}
