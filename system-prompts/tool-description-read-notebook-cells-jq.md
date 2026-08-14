<!--
name: 'Tool Description: Read notebook cells with jq'
description: >-
  Shows the model jq commands for reading selected cells of a large notebook
  instead of the whole file.
ccVersion: 2.1.231
variables:
  - BASH_TOOL_NAME
-->
Use ${BASH_TOOL_NAME} with jq to read specific portions:
  cat <notebook_path> | jq '.cells[:20]' # First 20 cells
  cat <notebook_path> | jq '.cells[100:120]' # Cells 100-120
  cat <notebook_path> | jq '.cells | length' # Count total cells
  cat <notebook_path> | jq '.cells[] | select(.cell_type=="code") | .source' # All code sources
