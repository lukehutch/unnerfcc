<!--
name: 'Tool Result: Git safety SSH jump host unquoted command hazard'
description: >-
  Warns that SSH pastes arguments unquoted into a remote shell command when
  connecting via a jump host.
ccVersion: 2.1.318
-->
, which ssh pastes unquoted into a shell command when it connects through a jump host (the file itself can name one)
