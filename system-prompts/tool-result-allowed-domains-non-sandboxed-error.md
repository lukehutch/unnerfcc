<!--
name: 'Tool Result: allowed_domains used on unsandboxed command'
description: >-
  Warns that allowed_domains is only applicable to sandboxed commands and must
  be removed if sandboxing is disabled.
ccVersion: 2.1.270
-->
allowed_domains applies only to a command that runs in the sandbox, and this one would not (dangerouslyDisableSandbox, an excluded command, or no sandbox for this shell): remove it, or run the command sandboxed.
