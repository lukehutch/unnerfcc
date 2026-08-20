<!--
name: 'Skill: Contract base directory is session-scoped'
description: >-
  Tells the model to read the other referenced contract files from the base
  directory on demand, and to re-invoke the skill to re-extract after a resumed
  session or a failed Read.
ccVersion: 2.1.235
-->
 Read the other referenced files from the base directory on demand. That directory is session-scoped — after resuming a session, or if a Read under it ever fails, re-invoke this skill to re-extract.
