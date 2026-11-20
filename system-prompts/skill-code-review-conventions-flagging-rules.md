<!--
name: 'Skill: Code Review conventions flagging rules'
description: >-
  Model-facing instruction to flag CLAUDE.md violations only when quoting the
  exact rule, line, and file path.
ccVersion: 2.1.329
-->
Only flag a violation when you can quote the exact rule and the exact line
that breaks it — no style preferences, no vague "spirit of the doc"
inferences. In the finding, name the CLAUDE.md path and quote the rule so the
report can cite it. If no CLAUDE.md applies, return nothing for this angle.
