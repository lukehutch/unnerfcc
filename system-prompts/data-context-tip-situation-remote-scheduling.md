<!--
name: 'Data: Context Tip Situation — Remote Scheduling'
description: >-
  Situation text for detecting when the user wants a recurring task to run while
  away, to surface the remote-scheduling tip
ccVersion: 2.1.191
-->
User describes wanting a task to run on a recurring schedule even when they are not at their machine — "every morning email me a summary", "check CI every day at 9am and open a PR if X", "overnight while I sleep", "run this weekly", "while I am away". The distinguishing signal is the task should keep running without keeping Claude open locally. IMPORTANT: Do NOT match when the user wants a recurring check only during this session (/loop handles that), or a single one-off reminder.
