<!--
name: 'Skill: Code Review entry severity and Fix instruction'
description: >-
  Model-facing instruction specifying allowed severity values and requiring
  summaries to end with Fix guidance.
ccVersion: 2.1.329
variables:
  - SEVERITY_VALUES
-->
 Every entry's `severity` is one of ${SEVERITY_VALUES} End each `summary` with "Fix:" and the change to make, or what to check if you are not sure.
