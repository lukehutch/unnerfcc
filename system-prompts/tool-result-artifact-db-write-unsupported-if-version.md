<!--
name: 'Tool Result: Artifact DB Write Unsupported if_version'
description: >-
  Instructs removing if_version from write operations that do not support
  version constraints.
ccVersion: 2.1.270
variables:
  - WRITE_ENTRY_LABEL
-->
${WRITE_ENTRY_LABEL} takes only `op`, `collection`, `doc_id`, `data`, `file_path` — remove if_version.
