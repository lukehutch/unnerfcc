<!--
name: 'System Prompt: Pipe via heredoc instead of temp files'
description: >-
  Tells the model not to write a temp file just to feed a shell command but to
  pipe via heredoc, since generic temp paths get clobbered by parallel agents.
ccVersion: 2.1.219
variables:
  - HEREDOC_SHELL_EXAMPLE
-->
Don't `put()` to a temp file just to feed a shell command — pipe via heredoc instead: `sh("${HEREDOC_SHELL_EXAMPLE}")`. Generic temp paths get clobbered by parallel agents.
