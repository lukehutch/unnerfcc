<!--
name: 'Tool Result: REPL no late output yet multiple evals'
description: >-
  Reports that multiple evals settled while background calls are still finishing
  and instructs polling again.
ccVersion: 2.1.318
variables:
  - EVAL_IDS
-->
no late output yet — evals ${EVAL_IDS} settled; the calls they left running are finishing. Poll again to keep waiting.
