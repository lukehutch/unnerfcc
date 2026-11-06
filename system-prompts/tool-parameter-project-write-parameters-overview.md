<!--
name: 'Tool Parameter: Project write parameters overview'
description: >-
  Explains parameters for project_write, requiring path and either content or
  local_path.
ccVersion: 2.1.318
variables:
  - ALLOWED_PATH_1
  - ALLOWED_PATH_2
-->
Pass `path` plus exactly one of `content` (inline text) or `local_path` (in the main conversation only: the absolute path of a text file of at most 1 MiB that you have read or written in full in this session and that has not changed since, under ${ALLOWED_PATH_1}, under ${ALLOWED_PATH_2}, or under the working directory
