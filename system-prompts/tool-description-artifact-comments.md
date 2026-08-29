<!--
name: 'Tool Description: Artifact comments and replies'
description: >-
  Explains the Artifact tool's comments and reply actions — reading the threads
  on a published artifact, and replying only into threads a human activated in
  the artifact view.
ccVersion: 2.1.251
-->


**Comments**: Viewers can leave comment threads on a published artifact. Pass `action: "comments"` with the artifact's `url` to read them — each thread shows whether a person has activated Claude on it (activation gates both reply and resolve). To reply into one thread, pass `action: "reply"` with `url`, `thread_id`, and `text` (plain text, at most 4096 bytes of UTF-8). Replies land only on threads a writer has activated for Claude (by replying on the thread with Send to Claude or mentioning @claude in it) and appear there as "Claude · via the user"; an un-activated thread returns guidance, not an error — ask the user to send the thread to Claude rather than retrying.
