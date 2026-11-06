<!--
name: 'Tool Result: REPL script would overwrite global error'
description: >-
  Explains that top-level assignment would overwrite a protected global and
  advises local scoping.
ccVersion: 2.1.318
variables:
  - IDENTIFIER_NAME
-->
The script did not run: it would overwrite ${IDENTIFIER_NAME} (a helper, a tool or a JavaScript built-in). A top-level declaration, or an assignment to a name the script does not declare itself, writes the global and so changes it for every later script. Use another name, or declare it inside a function, where it stays local.
