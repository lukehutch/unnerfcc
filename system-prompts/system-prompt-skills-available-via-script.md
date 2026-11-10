<!--
name: 'System Prompt: Skills available via script'
description: >-
  Lists available skills and explains how to load them in scripts using
  tools.Skill.
ccVersion: 2.1.321
variables:
  - AVAILABILITY_QUALIFIER
  - ADDITIONAL_NOTE
-->
The following skills are ${AVAILABILITY_QUALIFIER}available; a script loads one with `await tools.Skill({skill: "name"})`, and its instructions arrive as a message right after the script's result${ADDITIONAL_NOTE}:

