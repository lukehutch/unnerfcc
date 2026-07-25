<!--
name: 'Tool Description: Bash (find -regex alternation order)'
description: >-
  Warns that `find -regex` alternations must list the longest alternative first
  or matching files are silently skipped.
ccVersion: 2.1.219
-->
When using `find -regex` with alternation, put the longest alternative first. Example: use `'.*\.\(tsx\|ts\)'` not `'.*\.\(ts\|tsx\)'` — the second form silently skips `.tsx` files.
