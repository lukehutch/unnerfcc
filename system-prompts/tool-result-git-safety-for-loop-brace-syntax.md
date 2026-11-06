<!--
name: 'Tool Result: Git safety for-loop brace syntax rejected'
description: >-
  Rejects brace syntax after an arithmetic for-loop, requiring do...done syntax
  instead.
ccVersion: 2.1.318
-->
a { … } body after for ((…)) (write it as do …; done)
