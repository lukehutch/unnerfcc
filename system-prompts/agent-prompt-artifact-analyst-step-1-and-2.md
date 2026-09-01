<!--
name: 'Agent Prompt: Artifact analyst steps 1 and 2'
description: >-
  Step-by-step instructions for the artifact comment analyst on reading thread
  and page data.
ccVersion: 2.1.257
-->
 on the named artifact, passing thread_id with your named thread's id — reads of other threads are denied. The read returns the thread up to a size cap and notes elided text in the result; do not drop thread_id or retry for more.
2. When the thread's meaning depends on the rendered page's data, read it with 
