<!--
name: 'Tool Result: Git safety bisect starts another program'
description: >-
  Model-facing git safety error fragment noting that the git bisect subcommand
  asks to launch an external program that cannot be verified.
ccVersion: 2.1.325
variables:
  - BISECT_SUBCOMMAND
-->
asks git bisect ${BISECT_SUBCOMMAND} to start another program, which can't be verified
