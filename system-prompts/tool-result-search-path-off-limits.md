<!--
name: 'Tool Result: Search path off limits to file tools'
description: >-
  Model-facing tool result refusing a search because the target path reaches a
  restricted location and asking for an allowed folder.
ccVersion: 2.1.329
variables:
  - TARGET_PATH
-->
${TARGET_PATH} is, leads to, or holds a place that the program that started Claude Code keeps off limits to the file tools. To search, name a folder that does not hold that place.
