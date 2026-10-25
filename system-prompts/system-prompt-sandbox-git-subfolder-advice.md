<!--
name: 'System Prompt: Sandbox Git Subfolder Advice'
description: >-
  Advice on starting Claude Code at repo root and configuring filesystem
  allowRead for parent git directories.
ccVersion: 2.1.310
-->
 starting Claude Code at its root avoids this; adding the root to `sandbox.filesystem.allowRead`, under the first item's rules, lets `git` read but not commit; never suggest adding the root to `allowWrite`. That is their decision, and a large repository can slow the start or keep the sandbox from starting.
