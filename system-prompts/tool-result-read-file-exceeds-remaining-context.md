<!--
name: 'Tool Result: File exceeds remaining context in turn'
description: >-
  Informs the model that the file exceeds the remaining context window even with
  the force read parameter.
ccVersion: 2.1.310
variables:
  - FORCE_READ_PARAMETER
-->
 Even with ${FORCE_READ_PARAMETER}, this is more than fits in the context you have left this turn (other large reads in the same turn share that room).
