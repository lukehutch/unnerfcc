<!--
name: 'Tool Result: MXC sandbox refuses Bash commands'
description: >-
  Model-facing error explaining that the Windows MXC sandbox backend only runs
  PowerShell commands and directing the model to use the PowerShell tool or
  inform the user.
ccVersion: 2.1.329
-->
The command did not run. The sandbox's MXC backend (sandbox.windows.backend) runs PowerShell commands only, so Bash commands are refused in this session; use the PowerShell tool, and if it is not available, tell the user. Whoever manages the sandbox settings can set sandbox.windows.backend to "sandboxuser" and run claude sandbox install to use the sandbox account backend, which runs Bash commands (with Git for Windows installed), at the next start of Claude Code. Changing sandbox settings is for the user or their administrator to decide, not you.
