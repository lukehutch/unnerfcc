<!--
name: 'System Reminder: Directory sync changes too large for batch'
description: >-
  Informs the model that changes exceeded the single-turn transfer limit and
  will be sent across future turns.
ccVersion: 2.1.251
-->
Directory sync: this turn's changes were too large to send to the user's machine in one piece; they remain here (uncommitted edits go out once a later turn's delta fits; commits keep riding each bundle until the laptop has them).
