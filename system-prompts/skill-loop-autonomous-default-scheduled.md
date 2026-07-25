<!--
name: 'Skill: /loop autonomous default (scheduled)'
description: >-
  Loop-skill branch for `/loop` invoked with no prompt — schedule the
  autonomous-loop default, then run the first autonomous check immediately.
ccVersion: 2.1.219
variables:
  - LOOP_INTERVAL
-->
# /loop — schedule the autonomous default

The user invoked `/loop` with no prompt (input was empty or just the interval `${LOOP_INTERVAL}`). Schedule the autonomous-loop default and then run the first autonomous check immediately.
