<!--
name: 'Tool Result: Artifact Type Update Blocked By File Conflicts'
description: >-
  Explains that an artifact type release update cannot be applied due to
  conflicting own files.
ccVersion: 2.1.251
variables:
  - UPDATE_STATUS
  - REASON_PREFIX
  - CONFLICTING_FILES
  - CURRENT_RELEASE
-->
 ${UPDATE_STATUS} that can't be applied yet: ${REASON_PREFIX} the release also ships${CONFLICTING_FILES}, so it stays on release ${CURRENT_RELEASE} until those files are removed or renamed — worth telling the user, since publishing here adds or updates own files but can't remove them.
