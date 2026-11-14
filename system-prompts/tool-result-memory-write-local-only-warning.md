<!--
name: 'Tool Result: Memory write saved locally only warning'
description: >-
  Warns the model that a memory write was saved only on the local machine and
  will be lost if the machine is discarded before sync.
ccVersion: 2.1.325
variables:
  - SYNC_STATUS_REASON
-->
${SYNC_STATUS_REASON} This write was saved on this machine only and is NOT being synced. It may be uploaded later from this machine if the policy then allows sync. If this machine is discarded first, as when a cloud session ends, it is lost.
