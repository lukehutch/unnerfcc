<!--
name: 'Tool Result: Artifact edits refused hard link detected'
description: Refuses to apply edits in place to a hard-linked file.
ccVersion: 2.1.310
variables:
  - FILE_PATH
-->
Refusing to apply edits to ${FILE_PATH}: the file has other names on disk (a hard link), and writing it in place would change them all. Edit the file, then publish it without edits.
