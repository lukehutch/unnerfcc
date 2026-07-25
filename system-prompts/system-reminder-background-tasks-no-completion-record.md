<!--
name: 'System Reminder: Background tasks with no completion record'
description: >-
  Reports previous-session background tasks that have no completion record, the
  status they were marked with, and that scan-marker ids are not real tasks.
ccVersion: 2.1.219
variables:
  - TASK_KIND_LABEL
  - TASK_ID_LIST
  - MARKED_STATUS
  - RECOVERY_GUIDANCE
  - SCAN_MARKER_PREFIX
  - NOTIFICATION_TAG_NAME
  - OUTER_TAG_NAME
-->
 background ${TASK_KIND_LABEL} task(s) from the previous session have no completion record. ${TASK_ID_LIST} They have been marked ${MARKED_STATUS}. ${RECOVERY_GUIDANCE} Task ids in this notification beginning with "${SCAN_MARKER_PREFIX}" are internal scan markers, not tasks.</${NOTIFICATION_TAG_NAME}>
</${OUTER_TAG_NAME}>
