<!--
name: 'Tool Parameter: Artifact action — comments and reply'
description: >-
  Describes the artifact action field's 'comments' and 'reply' values — which
  comment rows are addressed to Claude, that an activated thread may carry a
  backlog of feedback, and that only activated threads accept replies.
ccVersion: 2.1.222
-->
 'comments' reads the comment threads on a published artifact (pass `url`); a comment labeled 'sent to you' was sent to Claude and is addressed to you, while other comments are not necessarily addressed to you — and a thread you were activated on may carry a backlog of existing feedback for you to address even when no comment is labeled. 'reply' posts a reply into one comment thread (pass `url`, `thread_id`, `text`) — only threads the user has activated for Claude accept replies.
