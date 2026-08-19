<!--
name: 'Tool Result: Reply discarded as a duplicate'
description: >-
  Tells the model its draft reply was discarded because a Claude reply already
  stands after every summon on the thread, and to resend with
  acknowledge_duplicate only for a follow-up that adds something genuinely new.
ccVersion: 2.1.235
-->
 already stands after every "sent to Claude" request on this thread, so another reply would read as a duplicate to the commenter. The draft was discarded. Read the thread (action "comments") if you have not; only if a further reply adds something genuinely new, send it again with acknowledge_duplicate: true.
