<!--
name: 'Skill Code: GitHub PR edit option refusal'
description: >-
  Restricts gh pr edit flags, requiring edits to apply to the current branch PR
  with inline arguments.
ccVersion: 2.1.273
variables:
  - SKILL_NAME
  - MATCHING_NOTE
  - REFUSAL_OVERRIDE_NOTE
-->
${SKILL_NAME} refuses `gh pr edit` with `--repo`/`-R`, `--body-file`/`-F`, `--base`/`-B` or a URL selector: edit the current branch's PR with the title and body passed inline and no selector. ${MATCHING_NOTE} ${REFUSAL_OVERRIDE_NOTE}
