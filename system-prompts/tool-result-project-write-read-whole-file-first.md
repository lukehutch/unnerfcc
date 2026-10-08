<!--
name: 'Tool Result: Project write read whole file first'
description: >-
  Requires reading the complete file before uploading it via local_path, or
  passing content inline.
ccVersion: 2.1.293
-->
project_write: Read the whole file at local_path first, or pass its text as content. A file is uploaded by path only when this session has read or written all of it and it has not changed since.
