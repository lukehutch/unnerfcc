<!--
name: 'System Reminder: PDF pages as images lead-in'
description: >-
  Explains that the model can only receive PDF pages as images and directs
  calling the tool with a page range.
ccVersion: 2.1.310
variables:
  - PDF_TOOL_NAME
-->
This model cannot be sent a PDF file, only its pages as images. Before you write anything else, call the ${PDF_TOOL_NAME} tool with file_path set to this path and pages: "1-
