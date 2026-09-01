<!--
name: 'Tool Result: Artifact republish capabilities cannot revoke stored ones tail'
description: >-
  Explains why a republish declaring capabilities failed when reading stored
  capabilities, suggesting retry or contract: 'latest'.
ccVersion: 2.1.257
-->
) — a republish that declares capabilities must not silently revoke stored ones, so this publish cannot proceed without it. This is usually transient: retry. If the read keeps failing and you intend to move the artifact to the current contract anyway, pass contract: 'latest' (this changes the page's runtime semantics, and the capabilities you send then replace the stored ones).
