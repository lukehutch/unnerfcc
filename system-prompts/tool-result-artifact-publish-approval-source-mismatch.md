<!--
name: 'Tool Result: Artifact Publish Approval Source Mismatch'
description: >-
  Reports that the publish approval cannot be matched to the source file and
  nothing was published.
ccVersion: 2.1.270
variables:
  - RETRY_INSTRUCTION
-->
file_path: the approval for this publish cannot be matched to the source file (another Claude Code version gave it, or a hook or SDK host rewrote it), so nothing was published. ${RETRY_INSTRUCTION}
