<!--
name: 'Tool Result: Git safety bisect log options only'
description: >-
  Model-facing git safety instruction restricting a git bisect subcommand to git
  log options such as --oneline.
ccVersion: 2.1.325
variables:
  - BISECT_SUBCOMMAND
-->
Give git bisect ${BISECT_SUBCOMMAND} only git log options, such as --oneline.
