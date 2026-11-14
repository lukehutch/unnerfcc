<!--
name: 'Tool Result: Restart packaging steps if changes needed'
description: >-
  Instructs restarting from step 1 of the packaging reference if the user wants
  the file changed first.
ccVersion: 2.1.325
variables:
  - PACKAGING_REFERENCE
-->
 If they want it changed first, start again from step 1 of ${PACKAGING_REFERENCE}.
