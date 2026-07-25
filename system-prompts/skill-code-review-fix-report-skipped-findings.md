<!--
name: 'Skill: Code Review (--fix) report skipped findings'
description: >-
  Tail of the --fix instructions telling the model to make the reporting call
  and then give one line per skipped finding saying why.
ccVersion: 2.1.219
variables:
  - REPORT_FINDINGS_INSTRUCTION
-->
Then ${REPORT_FINDINGS_INSTRUCTION}; after the call, give one line per skipped finding saying why.
