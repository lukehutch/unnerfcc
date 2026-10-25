<!--
name: 'Tool Result: Bash Output Lost (tmpfs Full)'
description: >-
  Bash tool_result when command output is lost because the temp filesystem is
  full (ENOSPC); suggests freeing space or CLAUDE_CODE_TMPDIR.
ccVersion: 2.1.310
variables:
  - TMPDIR_PATH
  - FREE_MB
  - OUTPUT_STATUS
  - REMEDIATION_GUIDANCE
-->
Disk full: this computer's volume holding ${TMPDIR_PATH} (Claude Code's temporary directory) has ${FREE_MB} MB free, ${OUTPUT_STATUS} ${REMEDIATION_GUIDANCE}
