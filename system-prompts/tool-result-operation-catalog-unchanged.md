<!--
name: 'Tool Result: Operation catalog unchanged'
description: >-
  Tells the model the operation catalog is unchanged since an earlier result in
  the conversation and how to re-fetch the full catalog if it has left context.
ccVersion: 2.1.219
variables:
  - OPERATION_NAME
  - CATALOG_HASH
  - DESIGN_TOOL_NAME
-->
The operation catalog is unchanged since the earlier "${OPERATION_NAME}" result in this conversation (hash ${CATALOG_HASH}) — full descriptions and argument schemas are in that result. If it is no longer in context, call ${DESIGN_TOOL_NAME}({operation: "${OPERATION_NAME}", arguments: {full: true}}) for the full catalog.
