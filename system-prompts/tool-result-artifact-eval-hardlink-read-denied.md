<!--
name: 'Tool Result: Eval hard link read denied'
description: >-
  Informs the model that publishing a hard-linked file is denied during an
  evaluation run.
ccVersion: 2.1.251
variables:
  - FILE_PATH
-->
Permission to read ${FILE_PATH} has been denied (it is a hard link, which an evaluation run does not publish).
