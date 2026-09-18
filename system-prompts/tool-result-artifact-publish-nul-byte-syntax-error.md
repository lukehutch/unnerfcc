<!--
name: 'Tool Result: Artifact publish NUL byte syntax error'
description: >-
  Warns that an artifact file contains a NUL byte which causes script syntax
  errors in browsers.
ccVersion: 2.1.277
variables:
  - BYTE_OFFSET
-->
 contains a NUL (\u0000) byte at ${BYTE_OFFSET}: it was published, but browsers turn that byte into U+FFFD (�), and in script code outside a string literal that is a syntax error that stops the whole script — remove it (or write the escape \u0000 if the character is meant) and publish again.
