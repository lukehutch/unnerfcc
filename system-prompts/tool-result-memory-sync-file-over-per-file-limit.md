<!--
name: 'Tool Result: Memory file over the per-file sync limit'
description: >-
  Tells the model a memory file exceeds the per-file sync limit so its changes
  stay local and are lost when the machine is recycled, to split or trim it, and
  to tell the user it is not being persisted.
ccVersion: 2.1.231
-->
 per-file sync limit — it is saved locally but is NOT synced to shared memory, so its changes will be lost when this session's machine is recycled and other sessions only see the last version that was under the limit. Split its content into smaller files under the limit (or trim it), then delete or shrink this one. Tell the user this memory file is not being persisted.
