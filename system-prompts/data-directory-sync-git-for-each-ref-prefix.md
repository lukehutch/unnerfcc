<!--
name: 'Data: Directory sync git for-each-ref command prefix'
description: >-
  Git command prefix used to query the latest snapshot ref created by directory
  sync.
ccVersion: 2.1.277
-->
`git for-each-ref --sort=-version:refname --count=1 --format='%(refname)' 
