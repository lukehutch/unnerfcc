<!--
name: 'Tool Description: Bash find search scope'
description: >-
  Bash guidance to run `find` from `.` or a specific path rather than `/`, since
  a full-filesystem scan can exhaust system resources.
ccVersion: 2.1.219
-->
When running `find`, search from `.` (or a specific path), not `/` — scanning the full filesystem can exhaust system resources on large trees.
