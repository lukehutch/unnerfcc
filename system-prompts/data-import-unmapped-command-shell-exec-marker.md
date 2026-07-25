<!--
name: 'Data: Import skipped — shell-exec marker risk'
description: >-
  Explains that an imported command was left unmapped because a '!' in a shell
  block plus argument placeholders could re-pair into executing text.
ccVersion: 2.1.219
-->
One of its shell blocks contains '!' while the command also has argument placeholders — a backtick in the typed arguments could re-pair the marker into executing text the block never consented to. Port it manually.
