<!--
name: 'Agent Prompt: Artifact comment sent-to-you head prefix'
description: Matches comment row heads addressed to Claude summoning the agent this turn.
ccVersion: 2.1.270
variables:
  - SENT_TO_YOU_MARKER
-->
 Every row whose head ends with "${SENT_TO_YOU_MARKER}]"
