<!--
name: 'Tool Parameter: Artifact database str_replace old_str'
description: >-
  old_str parameter description for str_replace database operation requiring
  uniqueness.
ccVersion: 2.1.270
-->
write_db with db_op 'str_replace' only: the exact text to replace, as it appears in the field's value. It must occur exactly once in that field; otherwise nothing is written and the result says whether it was absent or not unique.
