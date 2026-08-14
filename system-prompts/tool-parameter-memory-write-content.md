<!--
name: 'Tool Parameter: Memory document content'
description: >-
  content field of the memory write tool — the full UTF-8 text that replaces the
  whole document, with the normalization rules, the rejection of empty content,
  and the 100KB cap.
ccVersion: 2.1.231
-->
Full text content to write (UTF-8). Replaces the entire document — any line you omit is deleted. Line endings are normalized to LF, invisible/format characters are stripped, and other control characters are replaced with U+FFFD. Empty or whitespace-only content is rejected. Capped at 100KB per document.
