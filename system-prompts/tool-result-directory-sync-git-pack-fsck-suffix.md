<!--
name: 'Tool Result: Directory sync git pack fsck repair (suffix)'
description: >-
  Suffix advising running git fsck and notifying the user if the cloud checkout
  needs repair.
ccVersion: 2.1.257
-->
" (if it names a corrupt or missing object, `git fsck` says which; tell the user this cloud checkout needs repair)
