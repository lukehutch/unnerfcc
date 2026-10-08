<!--
name: 'Tool Parameter: claude_test_install noLock'
description: >-
  Describes the noLock parameter of claude_test_install for installing without
  checksum verification.
ccVersion: 2.1.293
-->
Only when the person asks for it: install from the version pins without the checksums in the plugin's lockfile, taking what their npm registry serves. This server first puts the question to them in a Claude Code dialog, and installs only if the dialog comes back with its box ticked. Never set this field by your own choice.
