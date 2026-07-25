<!--
name: 'Data: Import skipped — placeholder and backtick mix'
description: >-
  Explains that an imported command was left unmapped because argument
  substitution could assemble a live shell-exec marker at invocation time.
ccVersion: 2.1.219
-->
Mixes argument placeholders with backticks or '!' outside its shell blocks — argument substitution at invocation time could assemble a live shell-exec marker from them. Port it manually.
