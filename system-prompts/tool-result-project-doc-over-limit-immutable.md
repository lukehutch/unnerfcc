<!--
name: 'Tool Result: Oversized project doc cannot be modified'
description: >-
  Informs the model that an existing project doc exceeds the 1.9 MB limit so no
  tool can overwrite or delete it, though the user can delete it in claude.ai.
ccVersion: 2.1.329
variables:
  - ACTION_VERB
-->
This call changed nothing. The doc at this path holds more text than the 1.9 MB limit for one doc, and claude.ai lets no tool ${ACTION_VERB} such a doc. The user can still delete it in claude.ai, but this tool cannot bring its text back. A new doc under the limit can still be saved at a new path.
