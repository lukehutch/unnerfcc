<!--
name: 'Skill: Code Review target checkout context warning'
description: >-
  Model-facing warning to verify local files match the diff's added lines before
  using them for context and to pass this warning to subagents.
ccVersion: 2.1.329
-->
, and must stay as it is: before you lean on a file here for context, check that it already has the diff's added lines, and where it does not, judge from the diff alone and report nothing from that file. If you start subagents, give each one the diff itself and this warning: they see none of this.
