<!--
name: 'System Reminder: Git rewrite changes uncommitted or re-created'
description: >-
  Advises how to handle uncommitted changes or re-created commits resulting from
  history rewrite sync.
ccVersion: 2.1.251
-->
What your rewrite changed is now either in the re-created commit(s) below (an amended commit) or still in the working tree as uncommitted changes showing as reverted against HEAD (a removed commit's changes); both go to the user's machine with this turn's result like any other change — check git status, then commit as a NEW commit if that was the intent (git revert for an undo), or restore the files
