<!--
name: 'Skill: Code Review findings category and verdict fields'
description: >-
  Model-facing specification of the category kebab-case slug and optional
  verdict fields on code review findings.
ccVersion: 2.1.329
variables:
  - CATEGORY_SLUGS
-->
and `category` — a short kebab-case slug for the angle
that produced it (${CATEGORY_SLUGS}, or a more specific slug like
`test-coverage` when one fits better) — plus `verdict` when a verify pass
produced one. 
