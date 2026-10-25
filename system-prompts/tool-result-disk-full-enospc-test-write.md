<!--
name: 'Tool Result: Disk full ENOSPC on test write'
description: >-
  Reports that a test write beside command output failed with ENOSPC due to no
  space left on the temporary directory volume.
ccVersion: 2.1.310
variables:
  - TMPDIR_PATH
  - OUTPUT_STATUS
  - REMEDIATION_GUIDANCE
-->
Disk full: a test write beside this command's output file, on the volume holding ${TMPDIR_PATH} (Claude Code's temporary directory), failed with ENOSPC (the volume, or the user's quota on it, has no space left), ${OUTPUT_STATUS} ${REMEDIATION_GUIDANCE}
