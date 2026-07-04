<!--
name: 'Code Review: ReportFindings Output Instructions'
description: >-
  Code-review output section telling the model to call the ReportFindings tool
  once with {level, findings}.
ccVersion: 2.1.199
variables:
  - SKILL_CODE_REVIEW_OUTPUT_REPORT_FINDINGS_VAR_0
  - SKILL_CODE_REVIEW_OUTPUT_REPORT_FINDINGS_VAR_1
-->
## Output

Call the ${SKILL_CODE_REVIEW_OUTPUT_REPORT_FINDINGS_VAR_0} tool once to report this review's results
with \`{level, findings}\`. \`findings\` includes every surviving entry ranked
most-severe first; each entry has \`file\`, \`line\`, \`summary\`,
\`failure_scenario\`, and \`category\` — a short kebab-case slug for the angle
that produced it (\`correctness\`, \`simplification\`, \`efficiency\`,
\`reuse\`, \`altitude\`, \`conventions\`, or a more specific slug like
\`test-coverage\` when one fits better) — plus \`verdict\` when a verify pass
produced one. Include all surviving findings. If nothing survives verification,
call it with an empty array. Do not also print the findings as text.
