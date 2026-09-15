<!--
name: 'Tool Description: Artifact database intro, reads, and writes'
description: >-
  Introduces the Artifact database operations read_db and write_db, detailing
  get, list, query, set, and update.
ccVersion: 2.1.272
-->
**Artifact database**: a published artifact's page code can keep a small shared database, which `action: "read_db"` and `"write_db"` read and write as the person, with the artifact's `url` and a `db_op`. Reads: "get" (`collection` + `doc_id`) returns one document, "list" (`collection`) a page of a collection, and "query" (`collection`, optional `query`) the matching documents; further pages come with `query.limit` and `query.cursor` rather than by fetching documents one by one, and `out_dir` on a read saves large or many documents as JSON files instead of returning them. Writes: "set" replaces a document and "update" merges fields into it (from `data`, or from `file_path`, a local JSON file),
