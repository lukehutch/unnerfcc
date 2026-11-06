<!--
name: 'Tool Result: Notebook is not a plain text file'
description: Explains how to access Jupyter notebook cells or raw JSON via REPL tools.
ccVersion: 2.1.318
variables:
  - FILE_PATH
  - TOOL_NAME
-->
${FILE_PATH}: not a text file: ${TOOL_NAME} parses a notebook into its cells. For the cells, (await tools.${TOOL_NAME}({file_path: path})).file.cells; for the raw JSON, await $`cat ${path}`.json()
