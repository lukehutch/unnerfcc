<!--
name: Skill Listing System-Reminder Wrapper
description: >-
  Model-facing skill-listing system reminder injected each turn, announcing the
  skills available through the Skill tool.
ccVersion: 2.1.329
variables:
  - AVAILABILITY_QUALIFIER
  - ADDITIONAL_NOTE
  - SKILLS_LIST
-->
The following skills are ${AVAILABILITY_QUALIFIER}available for use with the Skill tool${ADDITIONAL_NOTE}:

${SKILLS_LIST}
