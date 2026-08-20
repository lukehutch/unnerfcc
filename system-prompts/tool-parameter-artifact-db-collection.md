<!--
name: 'Tool Parameter: Artifact database collection path'
description: >-
  collection field of the artifact tool's database actions — the segment rules
  for a collection path, how subcollections nest, and that read_db and write_db
  both require it.
ccVersion: 2.1.231
-->
Database collection path: 1-31 "/"-separated segments (letters, digits, _ - . ~ : @ + per segment), so subcollections nest like "boards/b1/columns". Required for read_db and write_db.
