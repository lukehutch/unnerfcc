<!--
name: 'System Reminder: Directory sync upload quiet (empty working dir)'
description: >-
  Informs the model that the user machine did not deliver files, leaving the
  working directory empty until a later turn.
ccVersion: 2.1.251
-->
Directory sync: the user's machine has not delivered its files before this turn began (it gave the upload up, or went quiet), and this session was created WITHOUT a copy of them, so the working directory is EMPTY; their files arrive at a later turn if a later message of theirs carries them. Say so if the user refers to their files, and do not create project files here meanwhile.
