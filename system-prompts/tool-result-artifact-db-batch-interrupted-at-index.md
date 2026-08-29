<!--
name: 'Tool Result: Artifact DB Batch Interrupted At Index'
description: Reports the index where a non-atomic batch write was interrupted by an error.
ccVersion: 2.1.251
variables:
  - ERROR_MESSAGE
  - WRITE_INDEX
-->
${ERROR_MESSAGE}: interrupted at writes[${WRITE_INDEX}] (write 
