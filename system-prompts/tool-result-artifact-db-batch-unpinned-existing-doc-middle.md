<!--
name: 'Tool Result: Artifact DB batch unpinned existing doc (middle)'
description: >-
  Middle segment explaining that an unpinned write to an existing document
  caused the entire atomic batch to fail.
ccVersion: 2.1.270
-->
, which already exists, and carried no if_version — the whole batch wrote nothing. Read that document back, re-plan its 
