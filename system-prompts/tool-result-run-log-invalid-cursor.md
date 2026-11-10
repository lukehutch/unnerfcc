<!--
name: 'Tool Result: Run log invalid cursor error'
description: >-
  Informs the model that the provided cursor is invalid for the session and
  explains how to paginate or restart.
ccVersion: 2.1.321
-->
cursor is not in the form that get_run_log hands out for this session_id, so nothing was read. A next_cursor from an older version of this tool, a typed number, another run's cursor or an edited one cannot be used. For older events, pass the next_cursor from the previous get_run_log result of the same run, unchanged; if it was null, there is nothing older to read. To start again from the newest events, leave cursor out.
