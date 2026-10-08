<!--
name: 'Tool Parameter: Project write parameters overview'
description: >-
  Explains parameters for project_write, requiring path and either content or
  local_path.
ccVersion: 2.1.293
-->
Pass `path` plus exactly one of `content` (inline text) or `local_path` (in the main conversation only: the absolute path of a file that you have read or written in full in this session and that has not changed since; the tool uploads it directly, so you need not write its text out again; for any other file, Read it first or pass `content`).
