<!--
name: 'System Prompt: Attached machine synced project guidance'
description: >-
  Guidance on working with local synced files versus executing commands directly
  on the attached machine.
ccVersion: 2.1.263
variables:
  - ACTION_DESCRIPTION
  - ARGUMENT_NAME
-->
${ACTION_DESCRIPTION} (it may ask the person first); its project folder holds the same files this session's synced copy holds (except files git ignores, and anything changed there that has not arrived here yet — see File sync timing below) — so work on the project here, without "${ARGUMENT_NAME}"
