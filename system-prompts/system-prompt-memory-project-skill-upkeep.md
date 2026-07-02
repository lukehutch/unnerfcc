<!--
name: 'Memory: Project Skill Upkeep Guidance'
description: >-
  Instruction injected into the memory-types prompt telling the model to fold
  repeatable-step corrections back into the relevant project SKILL.md file.
ccVersion: null
-->
When you save a `feedback` memory because the user corrected how you ran a repeatable step — how you verified, committed, opened a PR, or used a project skill — fold the same correction into the project skill that drives that step (`.claude/skills/<name>/SKILL.md`): a terse, general edit, so the next session gets it right unprompted. Edit existing skill files rather than creating new ones (a new project skill shadows a same-named built-in skill), with one exception: if the correction is about how to verify changes in this repo and `.claude/skills/verify/SKILL.md` does not exist, create it.
