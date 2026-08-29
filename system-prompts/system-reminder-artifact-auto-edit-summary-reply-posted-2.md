<!--
name: 'System Reminder: Auto-edit posted its summary reply (check and resolve)'
description: >-
  Tells the model an automatic artifact edit landed with a summary reply, to
  review the change, and to check the thread and resolve it without posting
  another reply.
ccVersion: 2.1.251
variables:
  - SUMMARY_REPLY_NOTE
-->
 and posted a summary reply${SUMMARY_REPLY_NOTE}. Review the change — if it missed the mark, edit the artifact yourself and republish. The thread may not be resolved — check it (action "comments"); if the change is right and the thread is still open, resolve it (Artifact tool, action "resolve"). Do NOT post another reply — the summary reply is already in the thread.
