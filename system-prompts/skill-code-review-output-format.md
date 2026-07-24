<!--
name: 'Skill: Code Review (findings JSON output)'
description: >-
  Shared output spec for the code-review skill — findings as a JSON array with
  file/line/summary/failure_scenario
ccVersion: 2.1.217
variables:
  - MAX_FINDINGS
  - REPORT_FINDINGS_TOOL_NAME
-->
## Output

Return every surviving finding as a JSON array:

\`\`\`json
[
  {
    "file": "path/to/file.ext",
    "line": 123,
    "summary": "one-sentence statement of the bug",
    "failure_scenario": "concrete inputs/state → wrong output/crash"
  }
]
\`\`\`

Rank findings most-severe first. Include every verified surviving finding. If nothing survives verification, return \`[]\`. Do not call the
${REPORT_FINDINGS_TOOL_NAME} tool even if it is available - this review's
output contract is the JSON block above.
