<!--
name: 'Data: Attached machine git diff raw command'
description: >-
  Raw git diff command template used when reviewing changes to be moved to an
  attached machine.
ccVersion: 2.1.277
-->
git -c core.quotePath=true -c diff.relative=false diff --raw --ignore-submodules=none HEAD <sha>
