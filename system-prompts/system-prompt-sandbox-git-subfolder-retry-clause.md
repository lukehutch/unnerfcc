<!--
name: 'System Prompt: Sandbox Git Subfolder Retry Clause'
description: >-
  Instructs retrying git alone outside the sandbox for git operations blocked by
  subfolder execution.
ccVersion: 2.1.310
-->
retry `git` alone, never a script or tool that calls it, as described above for a sandbox-caused failure, and tell the user in the same message that
