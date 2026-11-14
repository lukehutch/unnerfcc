<!--
name: 'Tool Result: Memory sync waiting on organization policy'
description: >-
  Warns the model that a memory write was saved locally only while waiting for
  organization sync policy to load.
ccVersion: 2.1.325
-->
Memory sync is waiting until your organization's policy has loaded. This write was saved on this machine only and is NOT being synced. Sync starts if the policy allows it. If this machine is discarded first, as when a cloud session ends, the write is lost.
