<!--
name: 'Tool Result: Code mode approval needed prompt unavailable retry in new code'
description: >-
  Informs that code needs approval and advises sending the step in a new piece
  of code or configuring permissions.
ccVersion: 2.1.318
variables:
  - CALL_PREFIX
-->
${CALL_PREFIX}It needs the user's approval, and no permission prompt can be shown here. Do not get the same effect another way to avoid the approval. You can send this step again in a new piece of code, which gets a check of its own. If it is refused in the same way, tell the user which step needs their approval: they can add a permission rule that allows it with /permissions.
