<!--
name: 'Tool Result: Multiple artifact files unread before replace'
description: >-
  Reports that multiple existing artifact files must be read before replacing or
  removing them.
ccVersion: 2.1.272
variables:
  - UNREAD_FILES_COUNT
-->
Not published: ${UNREAD_FILES_COUNT} files are already on the artifact and Claude has not read them. Claude needs to read them before replacing or removing them.
