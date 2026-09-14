<!--
name: 'Tool Description: Artifact database if_version write pinning'
description: >-
  Explains optimistic concurrency control using if_version to avoid overwriting
  concurrent changes in artifact databases.
ccVersion: 2.1.270
-->
 Pin every write to a document you have read: pass the `version` you last saw — every document you read shows it, and so does the result of every set, update and str_replace — as `if_version` on "set", "update", "str_replace" and "delete", and in each "batch" entry. There is then no need to re-read first to check for changes: if someone has edited the document since, a pinned write fails, writes nothing and names the current version (for a batch, the entry), and you re-read and redo that write rather than overwrite their change. `if_version` is optional; omit it only for a document you have not read.
