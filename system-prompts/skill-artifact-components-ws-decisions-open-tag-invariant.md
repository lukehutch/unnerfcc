<!--
name: 'Skill: Artifact components ws-decisions open tag invariant'
description: >-
  Specifies the exact byte sequence required at the end of the ws-decisions
  island open tag.
ccVersion: 2.1.251
variables:
  - TAG_END_BYTES
-->
The ws-decisions island's open tag must END with the exact bytes ${TAG_END_BYTES} (double-quoted id attribute, last in the tag, as the template ships it; a page read back from the server may carry the server's own data-id after the id, nothing else) — the session's mechanical extraction scans for that sequence.
