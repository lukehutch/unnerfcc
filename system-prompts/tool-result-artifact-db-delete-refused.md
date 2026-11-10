<!--
name: 'Tool Result: Artifact DB delete refused'
description: >-
  Informs that an artifact DB delete was refused due to non-existent data,
  access rules, or read-only status, advising not to retry.
ccVersion: 2.1.321
variables:
  - OPERATION_PREFIX
-->
${OPERATION_PREFIX}: the artifact's database refused this delete: the database has never been written to (so there is nothing to delete), the database's access rules or your access level do not let you delete there, or, less often, this artifact's data cannot be written right now; do not retry it
