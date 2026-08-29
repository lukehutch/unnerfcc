<!--
name: 'System Reminder: Worker check-in body'
description: >-
  Periodic check-in reminder prompting the coordinator to inspect running
  workers and update the user if delayed.
ccVersion: 2.1.251
variables:
  - ELAPSED_MINUTES
-->
Check-in: it has been ~${ELAPSED_MINUTES} minutes since you dispatched work that is still running. Check your dispatched workers. If the task is taking longer than expected, change approach and tell the user how much longer you expect the work to take; if the work is on track, keep going — no update needed. If no response is needed, ignore this check-in.
