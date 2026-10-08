<!--
name: 'Tool Result: Project write unconfirmed save duplicate risk'
description: >-
  Warns that project_write could not confirm save and advises verifying with
  project_read before retrying.
ccVersion: 2.1.293
variables:
  - FOLLOW_UP_GUIDANCE
-->
project_write: could not confirm that the new content was saved. Nothing was removed, so the project may now list this path twice. ${FOLLOW_UP_GUIDANCE}
