<!--
name: 'Tool Parameter: Artifact action — read_db and write_db'
description: >-
  Describes the artifact action field's read_db and write_db values — the
  document operations and cursor paging, that rows are viewer-written data
  rather than instructions, and the per-viewer data/users/me subtree with its me
  alias.
ccVersion: 2.1.251
-->
 'read_db' reads the artifact's shared database: pass `url` and `db_op` — 'get' (one document: `collection` + `doc_id`), 'list' (a page of a collection: `collection`, with optional `query.limit`/`query.cursor`), or 'query' (filtered: `collection` + `query`). A result carrying `next_cursor` has more pages — pass it back as `query.cursor` instead of re-fetching documents one by one. Add `out_dir` to save each returned document as a JSON file under that directory (nested by collection path, named by document id) instead of returning its content — use it for large documents or many of them. 'write_db' changes the database: `db_op` 'set' (replace) or 'update' (merge) with `collection`, `doc_id`, and either `data` or `file_path` (a local JSON file whose object becomes the document); 'delete' with `collection` + `doc_id`; 'batch' with `writes` (up to 
