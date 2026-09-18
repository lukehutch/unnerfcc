<!--
name: 'Tool Result: Shell parameter expansion guard rewrite (absolute path)'
description: >-
  Advises rewriting potentially empty variable expansions with shell error
  guards or using literal absolute paths.
ccVersion: 2.1.277
variables:
  - GUARD_PREFIX
  - VARIABLE_EXPRESSION
  - GUARD_SUFFIX
  - COMMAND
-->
rewrite it as ${GUARD_PREFIX}${VARIABLE_EXPRESSION}${GUARD_PREFIX}, which makes the shell stop with an error instead of running ${GUARD_SUFFIX} when ${COMMAND} is unset or empty, or use a literal absolute path
