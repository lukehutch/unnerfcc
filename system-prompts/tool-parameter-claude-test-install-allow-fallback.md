<!--
name: 'Tool Parameter: claude_test_install allowFallback'
description: >-
  Describes the allowFallback parameter of claude_test_install for falling back
  to the newest registry version.
ccVersion: 2.1.293
-->
Only when the person asks for it, after an install said their npm registry lacks the pinned Playwright: install the newest version of the same major that the registry has, which the plugin has no checksums for. This server first puts the question to them in a Claude Code dialog that names the version, and installs only if the dialog comes back with its box ticked. Never set this field by your own choice.
