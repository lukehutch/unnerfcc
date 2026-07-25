<!--
name: 'Tool Description: Workflow script determinism'
description: >-
  Workflow tool guidance that scripts must be deterministic — no Date.now,
  Math.random, or new Date — so runs can resume.
ccVersion: 2.1.219
-->
workflow scripts must be deterministic: Date.now()/Math.random()/new Date() are unavailable (breaks resume). Stamp results after the workflow returns, or pass timestamps via args.
