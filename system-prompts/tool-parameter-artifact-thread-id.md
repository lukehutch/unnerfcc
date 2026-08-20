<!--
name: 'Tool Parameter: Artifact comment thread id'
description: >-
  Model-facing Artifact tool `thread_id` input-schema param — the thread to
  reply into, mark resolved, or read on its own, with thread ids coming from
  action "comments" and from comment notifications.
ccVersion: 2.1.231
-->
reply: id of the comment thread to reply into. resolve: the thread to mark resolved. comments: read just this one thread (the size cap can still elide a very long thread). Thread ids come from action "comments" and from comment notifications.
