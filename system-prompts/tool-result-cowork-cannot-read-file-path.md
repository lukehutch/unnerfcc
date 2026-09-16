<!--
name: 'Tool Result: Cowork cannot read file path'
description: >-
  Reports failure to read a file path due to approval constraints in a Cowork
  session.
ccVersion: 2.1.273
variables:
  - PARAMETER_NAME
  - FILE_PATH
-->
cannot read ${PARAMETER_NAME} (${FILE_PATH}) — the file could not be examined, and no one can answer the approval card in this Cowork session. Check that the file exists as a plain file inside the connected folders, then retry with that path.
