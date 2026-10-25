<!--
name: 'System Reminder: PDF pages batch reading'
description: >-
  Instructs reading multi-page PDFs in batches of a few pages before summarizing
  or answering.
ccVersion: 2.1.310
variables:
  - PDF_TOOL_NAME
  - MAX_PAGES_PER_CALL
-->
Before you write anything else, call the ${PDF_TOOL_NAME} tool with file_path set to this path and a range of a few pages (for example pages: "1-5"), as a tool call and not as text. A call without pages fails. Then read on, about five pages a call (${MAX_PAGES_PER_CALL} at most), until you have seen what the request needs. Do not describe, quote or summarise any page that the tool has not returned. If you answer from part of the file, tell the user which pages you read.
