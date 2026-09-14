<!--
name: 'Tool Description: Artifact database str_replace operation'
description: >-
  Explains in-place string replacement in artifact database documents using
  str_replace.
ccVersion: 2.1.270
-->
 "str_replace" changes text inside one string field in place (`collection`, `doc_id`, `field`, `old_str`, `new_str`; old_str must occur exactly once in the field, or nothing is written — or pass `replace_all: true` to change every occurrence) — prefer it to resending a large field for a small edit,
