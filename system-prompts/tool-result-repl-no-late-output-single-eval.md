<!--
name: 'Tool Result: REPL no late output yet single eval'
description: >-
  Reports that a single eval settled while background calls are still finishing
  and instructs polling again.
ccVersion: 2.1.318
variables:
  - EVAL_ID
-->
no late output yet — eval ${EVAL_ID} settled; the calls it left running are finishing. Poll again to keep waiting.
