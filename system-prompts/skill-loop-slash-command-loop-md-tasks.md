<!--
name: 'Skill: /loop slash command (loop.md tasks)'
description: >-
  Handles /loop invoked with no prompt when a loop-tasks file exists, scheduling
  the tasks from loop.md at the given interval.
ccVersion: 2.1.219
variables:
  - LOOP_INTERVAL
-->
# /loop — schedule loop.md tasks

The user invoked `/loop` with no prompt (input was empty or just the interval `${LOOP_INTERVAL}`) and has a loop-tasks file at `
