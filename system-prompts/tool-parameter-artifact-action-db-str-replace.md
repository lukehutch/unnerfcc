<!--
name: 'Tool Parameter: Artifact action — db str_replace and if_version'
description: >-
  Describes the artifact action str_replace operation and optimistic concurrency
  version checking.
ccVersion: 2.1.270
-->
 'str_replace' with `collection`, `doc_id`, `field`, `old_str`, `new_str` swaps one exact, unique piece of text inside a string field without resending it (`replace_all`: every occurrence); pass `if_version` (the document's last-read `version`) on every 'set', 'update', 'str_replace' and 'delete', and on each 'batch' entry, so the write does nothing if the document has changed since (optional; omit it only for a document you have not read);
