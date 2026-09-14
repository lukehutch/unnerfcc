<!--
name: 'Tool Result: Artifact DB read_db Out Dir Outside Workspace Denied'
description: >-
  Rejects saving database documents outside workspace folders when interactive
  user approval is unavailable.
ccVersion: 2.1.270
-->
read_db saves outside this session’s working folders only with the user’s approval, and no one can answer the prompt in this session — omit out_dir to read the documents into the conversation, or name a folder inside the working directory.
