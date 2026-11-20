<!--
name: 'Tool Description: Document edits block format'
description: >-
  Model-facing guidance on using the edits parameter with search-and-replace
  blocks to modify existing text documents.
ccVersion: 2.1.329
variables:
  - SEARCH_MARKER
  - REPLACE_MARKER
  - END_MARKER
-->
 To change part of an existing text doc, pass `edits` instead: one block for each passage that changes, in this form, with each marker on its own line:
${SEARCH_MARKER}
text copied exactly from the doc, found once in it
${REPLACE_MARKER}
the text that replaces it
${END_MARKER}
To add text, search for a line next to it and repeat that line in the replacement. Also change every passage that your change makes untrue, such as a table, a total or a summary. Put all blocks for one doc in one call; they must not overlap, and if one does not match, none is saved. The doc's whole text must already be in this conversation, from a read or from your own write. Prefer `edits` unless you are rewriting most of the doc.
