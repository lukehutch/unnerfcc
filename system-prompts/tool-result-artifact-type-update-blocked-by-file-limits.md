<!--
name: 'Tool Result: Artifact Type Update Blocked By File Limits'
description: >-
  Explains that an artifact type release update cannot be applied because
  combined files exceed count or size limits.
ccVersion: 2.1.251
variables:
  - UPDATE_STATUS
  - CURRENT_RELEASE
-->
 ${UPDATE_STATUS} that can't be applied yet: together with this Artifact's own files it would exceed the limits on an Artifact's files (count or total size), so it stays on release ${CURRENT_RELEASE}; if total size is the cause, publishing smaller own files lets a later open apply it — own files can't be removed from here.
