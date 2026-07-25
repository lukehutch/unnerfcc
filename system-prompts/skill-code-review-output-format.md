<!--
name: 'Skill: Code Review (findings JSON output)'
description: >-
  Shared output spec for the code-review skill — findings as a JSON array with
  file/line/summary/failure_scenario
ccVersion: 2.1.219
variables:
  - MAX_FINDINGS
  - REPORT_FINDINGS_TOOL_NAME
-->
## Output

Return every surviving finding as a JSON array — ${MAX_FINDINGS} is a floor, not a ceiling; never drop a qualifying finding to stay under it:

```json
[
  {
    "file": "path/to/file.ext",
    "line": 123,
    "summary": "one-sentence statement of the bug",
    "failure_scenario": "concrete inputs/state → wrong output/crash"
  }
]
```

Ranked most-severe first. If more than ${MAX_FINDINGS} survive, report them all —
${MAX_FINDINGS} is a floor, not a cap. If nothing survives verification, return `[]`. Do not call the
${REPORT_FINDINGS_TOOL_NAME} tool even if it is available - this review's
output contract is the JSON block above.
