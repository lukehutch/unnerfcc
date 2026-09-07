<!--
name: 'Tool Result: Artifact publish not built on live content'
description: >-
  Error result refusing a publish because it was not built on the latest live
  version.
ccVersion: 2.1.263
variables:
  - VERSION_INFO
-->
This artifact's live version reached you earlier in this same turn${VERSION_INFO}, so this publish could not have been built on it: nothing was published. Publish again in your next turn, built on that content — do not resend this content unchanged.
