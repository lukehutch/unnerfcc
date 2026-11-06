<!--
name: >-
  Tool Result: Code mode approval needed prompt unavailable suggest permission
  rule
description: >-
  Informs that an action in code mode needs approval that cannot be prompted and
  suggests adding a rule via /permissions.
ccVersion: 2.1.318
variables:
  - CALL_PREFIX
-->
${CALL_PREFIX}It needs the user's approval, and no permission prompt can be shown here. The same call in a new piece of code would be refused in the same way. Do not get the same effect another way to avoid the approval. Go on with other work and tell the user which step needs their approval: they can add a permission rule that allows it with /permissions.
