<!--
name: 'Tool Result: Dangerous rm check resubmit guidance'
description: >-
  Model-facing guidance allowing non-destructive commands to be resent in plain
  bash/zsh syntax while forbidding resending destructive parts without user
  approval.
ccVersion: 2.1.329
-->
 A command that deletes or empties nothing can be sent again in plain syntax that bash and zsh both read, and that is not a workaround. A command that deletes or empties anything, by rm or any other means, needs the user: do not send that part again.
