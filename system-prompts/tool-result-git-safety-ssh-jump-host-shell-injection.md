<!--
name: 'Tool Result: Git safety SSH jump host shell injection hazard'
description: >-
  Warns that SSH interpolates parameters into shell commands when connecting
  through jump hosts.
ccVersion: 2.1.318
-->
, which ssh pastes into a shell command when it connects through a jump host (given here or in an ssh config file)
