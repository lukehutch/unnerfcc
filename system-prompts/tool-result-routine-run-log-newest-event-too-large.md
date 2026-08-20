<!--
name: 'Tool Result: Newest run-log event exceeds the size budget'
description: >-
  Tells the model the newest transcript event does not fit the size budget, so
  none of the page's transcript events are shown.
ccVersion: 2.1.231
variables:
  - SKIPPED_EVENT_COUNT
  - NEXT_CURSOR_NOTE
-->
(the newest transcript event on this page does not fit the size budget, so none of the page's ${SKIPPED_EVENT_COUNT} transcript event(s) are shown${NEXT_CURSOR_NOTE})
