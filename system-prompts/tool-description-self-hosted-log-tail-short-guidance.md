<!--
name: 'Tool Description: Self-hosted runner log tail short guidance'
description: >-
  Instructs using the redacted log tool instead of plain file reads or tail so
  secrets are stripped before display.
ccVersion: 2.1.325
-->
When you are about to read the recent lines of a self-hosted runner's log file, use it and not a plain read or tail of the file, because it strips secrets from the text before you see it.
