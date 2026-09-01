<!--
name: 'Tool Result: Artifact belongs to another Claude and not shared'
description: >-
  Informs that the artifact belongs to another Claude instance and instructs how
  to share it.
ccVersion: 2.1.257
variables:
  - TARGET_ENTITY
  - SHARE_ACTION
-->
this artifact belongs to another ${TARGET_ENTITY}'s Claude and has not been shared with this one — ask someone in the channel it was published from to open Share on it and ${SHARE_ACTION}.
