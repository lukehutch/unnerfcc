<!--
name: 'Skill: Code Review low effort cleanup checks'
description: >-
  Model-facing instruction in low-effort review to flag duplicated helpers and
  dead code visible in the diff hunk.
ccVersion: 2.1.329
-->

Also flag — still from the hunk alone — new code that duplicates an existing
helper visible in the diff context, and dead code the diff leaves behind.
