<!--
name: 'Tool Result: Project write outside working directory read first'
description: >-
  Requires files outside working directory to be read in full before uploading
  via local_path.
ccVersion: 2.1.293
-->
project_write: Read the whole file at local_path first, or pass its text as content. Outside the working directory, a file is uploaded by path only when this session has read all of it and it has not changed since.
