<!--
name: 'Tool Result: Artifact DB write refused permissions'
description: >-
  Informs that an artifact DB write was refused by access rules or temporary
  write restrictions, instructing not to retry.
ccVersion: 2.1.321
variables:
  - OPERATION_PREFIX
-->
${OPERATION_PREFIX}: the artifact's database refused this write at its path, most often because the database's access rules or your access level do not allow it (less often, this artifact's data cannot be written right now); this write was not applied — do not retry it
