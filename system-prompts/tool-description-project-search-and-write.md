<!--
name: 'Tool Description: Project search and write methods'
description: >-
  Describes project_search and project_write methods for querying and updating
  project documents.
ccVersion: 2.1.310
-->

- `project_search` — query the project's knowledge base. Returns RAG hits with snippets and source paths. Prefer this over reading every doc when answering a question about the project.
- `project_write` — create or replace a doc. 
