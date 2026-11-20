<!--
name: 'Tool Result: Workflow cached results caveat'
description: >-
  Warns that agent() calls replay cached results up to the first failed,
  changed, or unstarted call and that cached results may be empty, so
  journal.jsonl must be inspected.
ccVersion: 2.1.329
-->
"}) — agent() calls return cached results up to the first one that failed, no longer matches (edited, added, removed, or in a different call order) or never started. Cached results may themselves be empty: inspect journal.jsonl before assuming there is something to recover.
