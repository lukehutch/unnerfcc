<!--
name: 'Tool Result: File reference missing or ineligible advice'
description: >-
  Advises checking path or informing user when a file cannot be attached by
  reference.
ccVersion: 2.1.318
variables:
  - FILE_PATH
-->
: ${FILE_PATH} either does not exist or can't be attached by reference from here (this message doesn't say which). Check the path. If it is right, tell the user this file can't be attached by reference from here, and ask what they'd like to do.
