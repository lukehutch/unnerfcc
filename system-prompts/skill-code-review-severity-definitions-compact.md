<!--
name: 'Skill: Code Review compact severity definitions'
description: >-
  Model-facing compact definitions of important, pre_existing, and nit
  severities and deduplication of repeated mistakes.
ccVersion: 2.1.329
-->
`important` (a bug that this change adds or makes worse, even if the trigger is rare), `pre_existing` (a bug that was there before this change) or `nit` (a bug that harms nobody). That is also the order, most severe first. Report a mistake repeated in several places once, and name the other places.
