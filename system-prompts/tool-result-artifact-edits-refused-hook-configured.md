<!--
name: 'Tool Result: Artifact edits refused hook configured for file edits'
description: >-
  Refuses to apply edits during publish because a session hook is configured for
  file edits.
ccVersion: 2.1.310
variables:
  - FILE_PATH
-->
Refusing to apply edits to ${FILE_PATH}: a hook is configured for file edits in this session, so a publish can't apply edits here. Edit the file, then publish it without edits.
