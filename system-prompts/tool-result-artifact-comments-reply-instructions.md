<!--
name: 'Tool Result: Artifact comments reply instructions'
description: >-
  Footer of the artifact-comments result telling the model how to reply into a
  thread, which threads accept replies, when to resolve one, and how to read a
  single thread on its own.
ccVersion: 2.1.251
-->
To reply, call Artifact with action "reply", the same url, a thread_id from above, and text (plain text, ≤4096 UTF-8 bytes). Only activated threads accept replies; replies appear to viewers as "Claude · via the user". When you have finished acting on a thread, call action "resolve" with the same url and its thread_id — resolve only threads you actually addressed, and only threads that are open: a thread already marked resolved stays resolved (reply there if needed; never re-resolve it). Resolve, like reply, works only on threads activated for Claude: never call resolve on a thread marked NOT activated, even one you addressed — it stays open; tell the user which threads remain open because they are not sent to Claude, and that a writer can send one to Claude (reply on it with Send to Claude) or resolve it in the artifact view. To read one thread on its own (up to the size cap), call action "comments" with the same url and its thread_id.
