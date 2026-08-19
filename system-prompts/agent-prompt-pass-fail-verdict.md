<!--
name: 'Agent Prompt: Respond PASS or FAIL'
description: >-
  Closes the criterion-grader prompt by presenting the coding agent's output and
  telling the judging agent to answer with exactly one word: PASS or FAIL.
ccVersion: 2.1.235
variables:
  - GRADED_AGENT_OUTPUT
-->
):
${GRADED_AGENT_OUTPUT}


Respond with exactly one word: PASS or FAIL.
