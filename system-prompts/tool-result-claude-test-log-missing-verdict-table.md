<!--
name: 'Tool Result: Claude Test log missing verdict table'
description: >-
  Rejects finish call because log.md lacks a valid verdict table or blocked
  header, instructing to correct and rewrite.
ccVersion: 2.1.310
-->
log.md has no verdict table (| Spec | Verdict | Why | Screenshot | with one row per spec, each verdict cell holding PASS, FAIL or BLOCKED) and no "## Claude Test · BLOCKED · …" line — write the whole corrected log.md again, then finish again
