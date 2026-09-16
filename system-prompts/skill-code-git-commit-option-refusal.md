<!--
name: 'Skill Code: Git commit option refusal'
description: >-
  Restricts git commit options that bypass verification or read from files,
  requiring inline commit messages.
ccVersion: 2.1.273
variables:
  - SKILL_NAME
  - MATCHING_NOTE
  - REFUSAL_OVERRIDE_NOTE
-->
${SKILL_NAME} refuses `git commit` options that read the message from a file or template, skip hooks, amend, reuse a message or allow an empty commit (tokens starting `--fil`, `--te`, `--pathspec-fr`, `--no-veri`, `--no-g`, `--am`, `--allow-empty`, `--reu`, `--ree`, ` -F`, ` -t`). The option is refused, not the commit: pass the message inline with `-m` as the skill's example shows. ${MATCHING_NOTE} ${REFUSAL_OVERRIDE_NOTE}
