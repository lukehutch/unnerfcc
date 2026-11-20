<!--
name: 'Tool Description: PauseGoal usage hint'
description: >-
  Model-facing hint explaining to use PauseGoal only when a genuine user-only
  blocker prevents progress on the session goal.
ccVersion: 2.1.329
variables:
  - SET_GOAL_TOOL_NAME
-->
When only the user can remove what blocks the session goal, the stop check set by /goal or ${SET_GOAL_TOOL_NAME}, use it to pause the goal; never for work that is hard or slow.
