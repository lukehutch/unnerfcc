<!--
name: 'Tool Result: Artifact DB Data and File Path Not Accepted'
description: >-
  Rejects data and file_path parameters for database operations that do not
  accept document content.
ccVersion: 2.1.270
variables:
  - FIELD_PREFIX
  - DB_OP
-->
${FIELD_PREFIX}data and file_path are not accepted with db_op "${DB_OP}"
