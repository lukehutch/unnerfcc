<!--
name: 'Tool Result: Resumed agent cannot show permission prompt'
description: >-
  Informs the model that a tool call did not run because an agent resumed inside
  another tool call cannot display a permission prompt to the user.
ccVersion: 2.1.329
variables:
  - TOOL_NAME
-->
${TOOL_NAME} did not run. It needs the user's approval, and the user was not asked: this agent was resumed inside another tool call, and no permission prompt can be shown from there. Asking again from this agent shows no prompt either. This agent's reply goes back to that tool call, not to the user. A call that the main conversation makes itself, or an agent that it resumes itself, can show a prompt.
