<!--
name: 'System Reminder: Read line too long, slice by char'
description: >-
  guidance injected when a file's lines exceed Read's offset/limit, suggesting
  Bash character-range slicing
ccVersion: 2.1.178
variables:
  - SYSTEM_REMINDER_READ_LINE_TOO_LONG_SLICE_BY_CHAR_VAR_0
  - SYSTEM_REMINDER_READ_LINE_TOO_LONG_SLICE_BY_CHAR_VAR_1
-->
the file's lines are too long for Read's offset/limit. Slice by character range via Bash instead — e.g. python3 -c "print(open('${SYSTEM_REMINDER_READ_LINE_TOO_LONG_SLICE_BY_CHAR_VAR_0}').read()[A:B])" in ~${SYSTEM_REMINDER_READ_LINE_TOO_LONG_SLICE_BY_CHAR_VAR_1}-char spans until you have read 100% of it.
