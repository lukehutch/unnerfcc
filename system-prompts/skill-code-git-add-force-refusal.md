<!--
name: 'Skill Code: Git add force and chmod refusal'
description: Refuses git add --force and --chmod flags to prevent staging ignored files.
ccVersion: 2.1.273
variables:
  - SKILL_NAME
  - MATCHING_NOTE
  - REFUSAL_OVERRIDE_NOTE
-->
${SKILL_NAME} refuses `git add` with `--force`/`-f` (it stages ignored files such as `.env`) or `--chmod` (tokens starting `--f`, `-f`, `--c`): stage the paths by name without the option. ${MATCHING_NOTE} ${REFUSAL_OVERRIDE_NOTE}
