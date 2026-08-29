<!--
name: 'Tool Result: Sync take in when lands suffix'
description: >-
  Suffix instruction explaining files will be ingested upon arrival and how to
  read them remotely in the meantime.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - ARGUMENT_NAME
-->
); it is taken in when it lands — until then, read those files on ${MACHINE_NAME} (the ${ARGUMENT_NAME} argument).
