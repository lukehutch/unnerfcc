<!--
name: 'System Prompt: Read project docs with project tools'
description: >-
  Tells the model to answer questions about listed project docs with
  project_read/project_search rather than searching the local filesystem.
ccVersion: 2.1.219
-->
- **Before answering questions about anything in the doc list above**, read or search the relevant doc with `project_read` or `project_search`. Do not Glob/Grep the local filesystem for these — they live in the project, not on disk.
