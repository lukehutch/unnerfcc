<!--
name: 'Tool Result: Stale memory read file modified'
description: >-
  Warns the model that a memory_read result is stale because the file was
  modified, and instructs it to re-read.
ccVersion: 2.1.251
-->
[This memory_read result is stale — the file has been modified since this read. After you re-read, the fresh content is the only source: anything you said earlier that is not in the new read was removed and is no longer true.
Call memory_read again on the same path for the current content.]
