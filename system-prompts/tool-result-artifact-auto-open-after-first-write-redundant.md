<!--
name: 'Tool Result: auto_open after_first_write redundant'
description: >-
  Tells the model to remove auto_open when publishing file_path directly as its
  first write.
ccVersion: 2.1.251
-->
`auto_open`: "after_first_write" has nothing to wait for — this call's `file_path` publish is its first write; remove `auto_open`
