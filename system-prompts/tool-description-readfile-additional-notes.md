<!--
name: 'Tool Description: ReadFile additional notes'
description: >-
  Extra ReadFile usage notes covering notebooks, directories, screenshots, and
  empty files.
ccVersion: 2.1.219
variables:
  - EXTRA_READ_NOTES
-->

- This tool can read Jupyter notebooks (.ipynb files) and returns all cells with their outputs, combining code, text, and visualizations.
- This tool can only read files, not directories. To list files in a directory, use the registered shell tool.
- You will regularly be asked to read screenshots. If the user provides a path to a screenshot, ALWAYS use this tool to view the file at the path. This tool will work with all temporary file paths.
- If you read a file that exists but has empty contents you will receive a system reminder warning in place of file contents.${EXTRA_READ_NOTES}
