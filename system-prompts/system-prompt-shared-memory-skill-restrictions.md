<!--
name: 'System Prompt: Shared memory skill restrictions'
description: >-
  Lists what is dropped when a shared memory skill loads — capability
  frontmatter, inline shell, symlinked files, and oversized SKILL.md.
ccVersion: 2.1.219
-->
When a shared memory skill loads, capability frontmatter (`allowed-tools`, `hooks`, `model`, `shell`) is ignored, inline shell (`!` commands) does not run, symlinked files are not loaded, and a `SKILL.md` over 128KB is skipped.
