<!--
name: 'Skill Code: Git push option refusal'
description: >-
  Restricts git push options that force, delete, or modify remote refs, allowing
  only plain pushes.
ccVersion: 2.1.273
variables:
  - SKILL_NAME
  - REFUSAL_OVERRIDE_NOTE
-->
${SKILL_NAME} refuses `git push` forms that force, delete, mirror or prune refs, set push options, skip the pre-push hook or name a receive-pack (tokens starting `--force`, ` -f`, ` +`, `--de`, ` -d`, ` :`, `--m`, `--pru`, `--pu`, ` -o`, `--no-veri`, `--rece`, `--e`). A plain push of the branch to the configured remote is fine. The match is on the raw command text, so a ref name containing one of these fragments trips it too; tell the user rather than rewriting the command to slip past. ${REFUSAL_OVERRIDE_NOTE}
