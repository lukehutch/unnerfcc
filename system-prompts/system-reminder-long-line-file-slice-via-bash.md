<!--
name: 'System Reminder: Slice long-line files via Bash'
description: >-
  Tells the model a file's lines are too long for Read's offset/limit and to
  slice it by character range with a Bash one-liner instead.
ccVersion: 2.1.219
variables:
  - PYTHON_INTERPRETER
  - FILE_PATH
-->
its lines are too long for Read's offset/limit — slice by character range via Bash instead, e.g. ${PYTHON_INTERPRETER} -c 'print(open("${FILE_PATH}").read()[A:B])' in ~
