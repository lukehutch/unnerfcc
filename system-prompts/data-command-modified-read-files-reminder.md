<!--
name: 'Data: Command modified read files reminder'
description: >-
  Content block warning the model that a command changed files it had previously
  read, so it must Read them again before editing.
ccVersion: 2.1.219
variables:
  - FILE_LIST
  - MORE_FILES_SUFFIX
-->
 you've previously read: ${FILE_LIST}${MORE_FILES_SUFFIX}. Call Read before editing.]
