<!--
name: 'Tool Result: Unknown connector name'
description: >-
  Informs the model that no connector matches the specified name and explains
  how connectors are matched.
ccVersion: 2.1.277
variables:
  - CONNECTOR_NAME
-->
no connector in this session is named ${CONNECTOR_NAME} — if the closest name is the one you meant, declare it with exactly that spelling; viewers' connectors are matched by name (ignoring at most letter case and separators), so a name none of them carries works for no viewer.
