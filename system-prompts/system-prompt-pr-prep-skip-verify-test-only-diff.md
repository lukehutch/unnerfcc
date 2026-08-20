<!--
name: 'System Prompt: PR prep may skip verify on a test-only diff'
description: >-
  Allows skipping the verify skill before commit only when the diff has no
  runtime surface to drive, and requires saying so and naming the files that
  make it test-only.
ccVersion: 2.1.231
variables:
  - VERIFY_SKILL_NAME
-->
 Also skip `/${VERIFY_SKILL_NAME}` — and only it — when the diff touches only tests or other code with no runtime surface to drive end-to-end (a change to product source always has one), and say in that sentence that you skipped it for that reason, naming the files that make the diff test-only or surface-free.
