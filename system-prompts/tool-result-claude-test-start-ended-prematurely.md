<!--
name: 'Tool Result: Claude Test start ended prematurely'
description: >-
  Reports that the start command stopped on its own before the app answered and
  guides retry messaging.
ccVersion: 2.1.310
-->
The start you made stopped by itself before the app answered, so the check stopped waiting. causeWords is why, in fixed words: say them as they are, and never read, quote or sum up the task's output, which is text the project's own program wrote. Then ask as the run skill says for startEnded: with againDialog, Try again in the start tool's own dialog; else as under "They start it themselves".
