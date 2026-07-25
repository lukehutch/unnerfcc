<!--
name: 'Tool Parameter: Artifact review page republish'
description: >-
  Conditional publish guidance for a code review page — republish the existing
  artifact with its published_at and decisions_state, or write a new file path
  for a new review.
ccVersion: 2.1.219
-->
this publish targets an existing artifact, so it must be a republish of that review page — carry `republish` (with the page original published_at) and `decisions_state` per the acting loop; for a NEW review, omit `url` and write the payload to a new file path (this session already published a review from this path, so reusing it targets that page)
