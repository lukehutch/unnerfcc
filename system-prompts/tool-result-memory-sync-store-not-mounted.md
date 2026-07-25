<!--
name: 'Tool Result: Memory store not mounted'
description: >-
  Warns after a memory write that the directory belongs to an unmounted synced
  project store, so the write stays local and a later mounted session will
  overwrite it.
ccVersion: 2.1.219
-->
This file's directory belongs to a synced project memory store that is not mounted in this session. The write was saved locally but is NOT being synced, and a future session with the store mounted will overwrite it with server content. Move the content out of this directory to keep it.
