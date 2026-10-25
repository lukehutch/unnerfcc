<!--
name: 'Tool Description: Bash (sandbox — PowerShell temp env)'
description: >-
  Specifies temporary environment variables for Bash versus PowerShell commands
  in sandbox mode.
ccVersion: 2.1.310
variables:
  - BASH_SHELL
  - POWERSHELL_SHELL
  - SANDBOX_WRITABLE_LOCATION
-->
That is for ${BASH_SHELL} commands; in a sandboxed ${POWERSHELL_SHELL} command `TMPDIR` is not set, so use `$env:TEMP` there. Both are ${SANDBOX_WRITABLE_LOCATION}
