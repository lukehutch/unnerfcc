<!--
name: 'Tool Parameter: Project write if_version'
description: >-
  Describes the if_version parameter for project_write preventing concurrent
  document overwrites.
ccVersion: 2.1.310
-->
project_write to an existing doc: the `version` that came with the copy you worked from (from project_read or project_write). The write is refused if the doc has changed since. Omit for a new doc.
