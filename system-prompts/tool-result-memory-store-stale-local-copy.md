<!--
name: 'Tool Result: Write landed in an unsynced local memory copy'
description: >-
  Warns the model that the file it wrote sits in a leftover local copy of an
  unsynced project memory store, so the content is neither shared nor recalled,
  and to move it into the memory directory.
ccVersion: 2.1.231
-->
This file's directory is a leftover local copy of a project memory store that is no longer synced. The write was saved locally only: it is not shared with the project and memory recall does not read this directory. Move the content into your memory directory to keep using it.
