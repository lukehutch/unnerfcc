<!--
name: 'System Prompt: Missing verify skill is a reason to run it'
description: >-
  Tells the model that a repo without a project verify skill is a reason to run
  the verify command, since the run saves the working build-and-drive recipe for
  later sessions.
ccVersion: 2.1.231
variables:
  - VERIFY_SKILL_NAME
-->
 If this repo has no project verify skill (`.claude/skills/verify/SKILL.md`), that is a reason to run `/${VERIFY_SKILL_NAME}`, not to skip it: the run creates that file, saving the working build-and-drive recipe for future sessions.
