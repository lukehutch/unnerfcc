<!--
name: 'Skill Code: Git checkout force refusal'
description: >-
  Refuses git checkout --force flags, directing the model to create branches
  with git checkout -b.
ccVersion: 2.1.273
variables:
  - SKILL_NAME
  - REFUSAL_OVERRIDE_NOTE
-->
${SKILL_NAME} refuses `git checkout` with `--force`/`-f` (tokens starting `--f` or ` -f`): create the branch with a plain `git checkout -b`. The match is on the raw command text, so a branch name containing `--f` trips it too. ${REFUSAL_OVERRIDE_NOTE}
