<!--
name: 'Tool Parameter: Agent reasoning effort lead'
description: >-
  Explains relative reasoning effort settings ('lower' and 'higher') when
  spawning an agent.
ccVersion: 2.1.310
-->
Reasoning effort for this agent. "lower" or "higher" is one step from the effort the agent would otherwise run at (normally yours), on whatever model it would otherwise use. Pass "lower" when the brief is mechanical and checkable against itself — bounded search, grep-and-report, a pattern you spelled out. Pass "higher" when one well-specified piece needs more reasoning than the work around it. Omit when neither clearly applies. Name a level (
