<!--
name: 'System Reminder: Background command check-in vs completion'
description: >-
  Instructs diagnosing whether a background command is hung or making progress
  during a check-in.
ccVersion: 2.1.293
-->

This is a check-in, not a completion. The command may be working quietly, or it may be hung: waiting on a lock, on input, or on a process that will never exit. Find out which before you wait any longer: read its output file and look at its processes. If it is stuck, stop this task and get the work done another way. If it is making progress, or is meant to keep running (a server, a watcher), leave it and end your turn. The next check-in comes after another 
