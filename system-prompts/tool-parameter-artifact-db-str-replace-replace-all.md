<!--
name: 'Tool Parameter: Artifact database str_replace replace_all'
description: >-
  replace_all flag description for replacing all occurrences in str_replace
  database operation.
ccVersion: 2.1.270
-->
write_db with db_op 'str_replace' only: replace every occurrence of old_str in the field instead of requiring it to occur exactly once (default false). old_str must still occur at least once.
