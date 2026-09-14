<!--
name: 'System Reminder: Background tasks with no completion record'
description: >-
  Reports previous-session background tasks that have no completion record, the
  status they were marked with, and that scan-marker ids are not real tasks.
ccVersion: 2.1.270
variables:
  - DETAIL_NOTE
  - CLOSE_TAG_1
  - OPEN_TAG_2
  - TASK_DETAILS
  - SCAN_MARKER_PREFIX
  - OUTER_TAG_NAME
-->
. ${DETAIL_NOTE}</${CLOSE_TAG_1}>
<${OPEN_TAG_2}>No completion record was found for them in the previous session. ${TASK_DETAILS} Task ids in this notification beginning with "${SCAN_MARKER_PREFIX}" are internal scan markers, not tasks.</${OPEN_TAG_2}>
</${OUTER_TAG_NAME}>
