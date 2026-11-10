<!--
name: 'Tool Result: Run log older events pagination notice'
description: >-
  Notifies that older transcript events did not fit and instructs passing
  next_cursor as cursor.
ccVersion: 2.1.321
variables:
  - OLDER_EVENT_COUNT
-->
 transcript event(s) on this page; the ${OLDER_EVENT_COUNT} older one(s) did not fit in this result: pass next_cursor as cursor to read them)
