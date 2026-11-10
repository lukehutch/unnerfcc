<!--
name: 'Tool Result: Incomplete copy may remain warning'
description: >-
  Warns that an unremoved, possibly incomplete file copy may remain and
  instructs not to use it and notify the user.
ccVersion: 2.1.321
variables:
  - FILE_PATH
-->
 What had been written was not removed: a copy, possibly incomplete, may remain ${FILE_PATH}. Don't use it as the file; tell the person, who may want to delete it.
