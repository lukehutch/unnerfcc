<!--
name: 'Tool Description: Bash (sandbox — PowerShell TEMP path)'
description: >-
  States that TMPDIR is unset in sandboxed PowerShell and specifies the TEMP
  directory path.
ccVersion: 2.1.310
variables:
  - SHELL_TYPE
  - TEMP_PATH
-->
In a sandboxed ${SHELL_TYPE} command `TMPDIR` is not set, and `$env:TEMP` is ${TEMP_PATH}
