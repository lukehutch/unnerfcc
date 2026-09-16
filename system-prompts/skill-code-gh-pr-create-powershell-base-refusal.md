<!--
name: 'Skill Code: GitHub PR create PowerShell base flag refusal'
description: >-
  Restricts --base/-B flag on gh pr create in PowerShell to prevent collisions
  with --body short flag.
ccVersion: 2.1.273
variables:
  - SKILL_NAME
  - MATCHING_NOTE
  - REFUSAL_OVERRIDE_NOTE
-->
${SKILL_NAME} refuses `--base`/`-B` on `gh pr create` in PowerShell, where the `-b` short form of `--body` trips it too: spell it `--body`. The option is refused, not opening the pull request: if the default branch is the intended target, re-run it without `--base`, with the title and body passed inline as the skill's example shows, and the pull request opens against it. ${MATCHING_NOTE} ${REFUSAL_OVERRIDE_NOTE}
