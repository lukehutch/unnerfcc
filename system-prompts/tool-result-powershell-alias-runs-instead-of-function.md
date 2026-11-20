<!--
name: 'Tool Result: PowerShell alias runs instead of function'
description: >-
  Model-facing clause explaining that calling a shadowed name runs the
  PowerShell alias rather than the defined function.
ccVersion: 2.1.329
variables:
  - ALIAS_NAME_CLAUSE
-->
${ALIAS_NAME_CLAUSE}, so a call by such a name runs the alias, not the function defined here.
