<!--
name: 'Tool Result: Remote machine case sensitivity hint'
description: >-
  Instructs using exact lowercase machine names when an attached machine is not
  found.
ccVersion: 2.1.251
variables:
  - REQUESTED_MACHINE
  - SUGGESTED_MACHINE
-->
No machine named "${REQUESTED_MACHINE}" is attached to this session — machine names are exact and lower-case: use "${SUGGESTED_MACHINE}"
