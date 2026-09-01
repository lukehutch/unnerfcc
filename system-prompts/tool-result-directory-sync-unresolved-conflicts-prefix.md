<!--
name: 'Tool Result: Directory sync unresolved conflicts (prefix)'
description: Prefix warning that unresolved git conflicts exist on the user's machine.
ccVersion: 2.1.257
variables:
  - CONFLICT_DETAILS
-->
Directory sync: the user has unresolved conflicts on their machine (a merge, rebase, cherry-pick, revert or stash pop in progress) — ${CONFLICT_DETAILS} 
