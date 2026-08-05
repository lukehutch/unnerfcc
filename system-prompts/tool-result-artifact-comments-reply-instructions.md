<!--
name: 'Tool Result: Artifact comments reply instructions'
description: >-
  Footer of the artifact-comments tool result telling the model how to reply
  into a thread, that only activated threads accept replies, and how viewers see
  the attribution.
ccVersion: 2.1.222
-->
To reply, call Artifact with action "reply", the same url, a thread_id from above, and text (plain text, ≤4096 UTF-8 bytes). Only activated threads accept replies; replies appear to viewers as "Claude · via the user".
