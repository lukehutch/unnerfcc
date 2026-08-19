<!--
name: 'Agent Prompt: The narration next line restates, never predicts'
description: >-
  Tells the narration prompt to include the next: line only when the
  conversation above already names the upcoming step and it is still ahead, and
  to reply with the now: line alone otherwise.
ccVersion: 2.1.235
-->
The next line restates, it never predicts: include it only when the conversation above — thinking, prose, or a task list — already names the step that follows, and that step is still ahead. If no upcoming step is stated, or now: is the last one — usually the case near the end of a task — reply with the now: line alone.
