<!--
name: 'Skill: Code Review branch fallback notice and empty-diff stop'
description: >-
  Model-facing verbatim fallback notice for reviewing the checked-out branch and
  instructions to stop with one sentence if no target or diff exists.
ccVersion: 2.1.329
variables:
  - FAILURE_REASON
  - TARGET_KIND
  - REPORT_FINDINGS_TOOL_NAME
-->
: "${FAILURE_REASON}. This review is of the checked-out branch instead, which may not be that ${TARGET_KIND}."

Two cases end the review instead: the command answers that there is no such ${TARGET_KIND}, or, falling back, you find that the checked-out branch has no diff. Then reply with only one sentence that says which, and no list of findings, not even an empty one, and make no ${REPORT_FINDINGS_TOOL_NAME} call.
