<!--
name: 'Skill: Code Review low effort exclusions'
description: >-
  Model-facing instruction in low-effort review forbidding flagging style,
  naming, performance, missing tests, or out-of-hunk issues.
ccVersion: 2.1.329
-->


Focus on runtime correctness and real defects; include performance issues, missing tests, or context outside the hunk when they reveal a genuine problem, and skip pure style or naming nitpicks unless they obscure intent.

