<!--
name: 'Agent Prompt: Compaction summarization request exclusion'
description: >-
  Instructs the compaction agent not to treat the system-issued summarization
  request itself as part of the user conversation or pending work.
ccVersion: 2.1.325
variables:
  - SUMMARIZATION_START_MARKER
-->
 This summarization request itself (the text from "${SUMMARIZATION_START_MARKER}" through the end of this message) was issued by the system to compact context, not by the user, and is not part of the conversation: do not list, quote, or describe it, or any earlier summarization request, as a user message, pending task, current work, or next step. Any user text that precedes it in the same message still counts as a user message. Any "Additional Instructions" in it still apply. All else that the summary is asked to hold stays as asked, in full.
