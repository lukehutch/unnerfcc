<!--
name: 'Tool Result: Artifact DB Collection Path Has Even Segments'
description: >-
  Explains that a database path with an even number of segments is a document
  path, not a collection path.
ccVersion: 2.1.251
variables:
  - SEGMENT_COUNT
  - COLLECTION_PATH
  - DOC_ID
-->
' has ${SEGMENT_COUNT} segments, which makes it a document path, not a collection: collection paths have an odd number of segments (collection/document/collection/…) and the document is collection + doc_id. For that document use collection '${COLLECTION_PATH}' with doc_id '${DOC_ID}'; for a collection inside it, add one more segment. Per-user data follows the same rule — collection 'data/users/<id>' (3 segments) holds that user's documents, so 'data/users/<id>/decks' is one document and 'data/users/<id>/decks/cards' a collection.
