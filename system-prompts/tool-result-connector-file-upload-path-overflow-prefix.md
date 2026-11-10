<!--
name: 'Tool Result: Connector file upload path line limit overflow prefix'
description: >-
  Explains that the file list exceeds the line limit of the permission approval
  prompt.
ccVersion: 2.1.321
variables:
  - FILE_COUNT
  - MAX_LINES
-->
No file was sent: this call names ${FILE_COUNT} files, and Claude Code sends only files whose full paths fit whole in the ${MAX_LINES}-line list of files of its approval prompt (a long path takes several lines
