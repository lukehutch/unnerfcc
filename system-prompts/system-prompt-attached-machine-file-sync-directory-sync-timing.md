<!--
name: 'System Prompt: Attached machine file sync directory sync timing'
description: >-
  Details when directory sync notifications appear for write versus read-only
  commands executed remotely.
ccVersion: 2.1.263
-->
is sent back as it finishes — for a command that writes, before you see its result (a "Directory sync:" line under the result says what came); for a read-only one, before your next step, with a notice.
