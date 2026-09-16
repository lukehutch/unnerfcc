<!--
name: 'Skill Code: GitHub PR create option refusal'
description: 'Restricts gh pr create flags, requiring title and body to be passed inline.'
ccVersion: 2.1.273
variables:
  - SKILL_NAME
  - MATCHING_NOTE
  - REFUSAL_OVERRIDE_NOTE
-->
${SKILL_NAME} runs `gh pr create` only in its instructed form and refuses `--repo`/`-R`, `--head`/`-H`, `--body-file`/`-F` and `--recover` on it. The option is refused, not opening the pull request: re-run it with the title and body passed inline as the skill's example shows; that retry is the intended fix, not a workaround. ${MATCHING_NOTE} ${REFUSAL_OVERRIDE_NOTE}
