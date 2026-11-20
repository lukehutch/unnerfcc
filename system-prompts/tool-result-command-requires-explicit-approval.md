<!--
name: 'Tool Result: Command requires explicit approval'
description: >-
  Model-facing denial requiring explicit user approval while permitting
  non-destructive commands to be resent in plain bash/zsh syntax.
ccVersion: 2.1.329
variables:
  - DENIAL_REASON
-->
${DENIAL_REASON} This requires explicit approval. A command that deletes nothing can be sent again in plain syntax that bash and zsh both read, and that is not a workaround. A command that deletes anything, by rm or any other means, needs the user: do not send that part again.
