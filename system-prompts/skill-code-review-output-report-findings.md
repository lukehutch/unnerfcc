<!--
name: 'Code Review: ReportFindings Output Instructions'
description: >-
  Code-review output section telling the model to call the ReportFindings tool
  once with {level, findings}.
ccVersion: 2.1.219
variables:
  - REPORT_FINDINGS_TOOL_NAME
  - MAX_FINDINGS
-->
## Output

Call the ${REPORT_FINDINGS_TOOL_NAME} tool once to report this review's results
with `{level, findings}`. `findings` includes every surviving entry — at least
${MAX_FINDINGS} when that many qualify, and more when more do — ranked
most-severe first; each entry has `file`, `line`, `summary`,
`short_summary` — the claim compressed to ≤60 characters, no rationale
or consequence clause — `failure_scenario`, and `category` — a short kebab-case slug for the angle
that produced it (`correctness`, `simplification`, `efficiency`,
`reuse`, `altitude`, `conventions`, or a more specific slug like
`test-coverage` when one fits better) — plus `verdict` when a verify pass
produced one. If more than ${MAX_FINDINGS} survive, report all of them —
${MAX_FINDINGS} is a floor, not a ceiling. If
nothing survives verification, call it with an empty array. Do not also print
the findings as text, and do not create or publish an artifact of the review -
the tool call is the report.
