<!--
name: 'System Reminder: Read line too long, slice by char'
description: >-
  guidance injected when a file's lines exceed Read's offset/limit, suggesting
  Bash character-range slicing
ccVersion: 2.1.217
variables:
  - PYTHON_COMMAND
  - FILE_PATH
  - SLICE_SPAN_CHARS
-->
the file's lines are too long for Read's offset/limit. Slice by character range via Bash instead — e.g. ${PYTHON_COMMAND} -c 'print(open("${FILE_PATH}").read()[A:B])' in ~${SLICE_SPAN_CHARS}-char spans until you have read 100% of it.
