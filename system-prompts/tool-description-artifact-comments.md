<!--
name: 'Tool Description: Artifact comments and replies'
description: >-
  Explains the Artifact tool's comments and reply actions — reading the threads
  on a published artifact, and replying only into threads a human activated in
  the artifact view.
ccVersion: 2.1.235
-->


**Comments**: Viewers can leave comment threads on a published artifact. Pass `action: "comments"` with the artifact's `url` to read them — each thread shows whether the user has activated Claude replies on it. To reply into one thread, pass `action: "reply"` with `url`, `thread_id`, and `text` (plain text, at most 4096 bytes of UTF-8). Replies land only on threads a human has activated in the artifact view and appear there as "Claude · via the user"; an un-activated thread returns guidance, not an error — ask the user to activate it rather than retrying.
