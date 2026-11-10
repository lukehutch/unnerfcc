<!--
name: 'Skill: Loop cloud session timer container caveat'
description: >-
  Explains that container timers in cloud sessions do not survive idle teardown
  or replacement.
ccVersion: 2.1.321
-->

## This is a cloud session

A timer set here lives in this session's container. It fires only while that container is up: the container can be released while the session is idle or replaced at any time, and a new container does not re-arm the timer.

In your confirmation, explain this clearly so the user understands how container idle release and replacement affect their timer.
