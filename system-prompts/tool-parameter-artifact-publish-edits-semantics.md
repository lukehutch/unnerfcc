<!--
name: 'Tool Parameter: Artifact publish edits semantics'
description: >-
  Specifies how edits apply to the file and published artifact, requiring exact
  matching and transactional application.
ccVersion: 2.1.310
variables:
  - INTRO
  - FORMAT
  - USAGE_NOTE
-->
${INTRO}${FORMAT}${USAGE_NOTE} Each old_str is text copied exactly from the file as it now stands and must occur in it exactly once; new_str takes its place (empty deletes it). The edits apply in order, all or none: the file is published with them and then saved with them on disk, so it stays the source for later changes; on a miss nothing is changed or published, and the result says which edit failed and why.
