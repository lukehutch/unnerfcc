<!--
name: 'Tool Result: Goal set without approval'
description: >-
  Tells the model the goal was set directly with no approval dialog, that it
  becomes active at the end of the turn when a kickoff message arrives, and to
  keep working instead of waiting.
ccVersion: 2.1.231
-->
Setting the goal now, without an approval dialog — the user sees it being set and can clear it with /goal clear. It becomes active at the end of this turn, when you will receive a kickoff message confirming it; until that message arrives, any previously set goal remains in effect. Continue working — do not wait for the kickoff.
