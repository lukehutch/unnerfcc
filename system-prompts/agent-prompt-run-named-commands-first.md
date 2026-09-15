<!--
name: 'Agent Prompt: Run named commands first'
description: >-
  Instructs running the specified commands first and using their outputs in the
  subsequent steps.
ccVersion: 2.1.272
variables:
  - TOOL_NAME_SPECIFIER
  - JOINED_ALTERNATIVE
-->
 commands first, exactly as written${TOOL_NAME_SPECIFIER}, and use their output where each is named below. Run them one per call${JOINED_ALTERNATIVE}.]
