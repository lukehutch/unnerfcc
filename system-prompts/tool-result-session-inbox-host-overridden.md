<!--
name: 'Tool Result: Session inbox API host overridden'
description: >-
  Informs the model that the Remote Control API host is overridden by settings
  and cannot be read.
ccVersion: 2.1.273
-->
The Remote Control API host is overridden by a settings file rather than this process's own environment, so the inbox was not read. Tell the user; don't retry.
