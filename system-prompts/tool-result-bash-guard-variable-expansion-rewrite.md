<!--
name: 'Tool Result: Shell variable expansion rewrite'
description: >-
  Advises rewriting potentially empty variable expansions with safe shell guards
  or using literal paths.
ccVersion: 2.1.277
variables:
  - REWRITE_SYNTAX
-->
rewrite it as ${REWRITE_SYNTAX} or use a literal path
