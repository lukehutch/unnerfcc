<!--
name: 'Tool Result: Remote machine not attached omit param'
description: >-
  Tells the model no machine of that name is attached and to omit the parameter
  to run locally.
ccVersion: 2.1.251
variables:
  - REQUESTED_MACHINE
  - PARAM_NAME
-->
No machine named "${REQUESTED_MACHINE}" is attached to this session — to run this in the session's own environment, omit "${PARAM_NAME}".
