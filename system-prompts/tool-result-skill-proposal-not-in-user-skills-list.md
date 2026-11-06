<!--
name: 'Tool Result: Skill not in user skills list'
description: >-
  Explains that the skill is not currently listed in user skills so cannot be
  updated.
ccVersion: 2.1.318
variables:
  - SKILL_PREFIX
  - SKILL_NAME
  - SKILL_ORIGIN
  - DISALLOWED_NAME
  - EXISTING_SKILL_NAME
-->
${SKILL_PREFIX}${SKILL_NAME} is ${SKILL_ORIGIN}, not one of the user's own skills, so the review card cannot update it. To customize it for the user, propose kind "new" under a name of its own — not ${DISALLOWED_NAME} — with a description that says when to use it instead of ${EXISTING_SKILL_NAME}.
