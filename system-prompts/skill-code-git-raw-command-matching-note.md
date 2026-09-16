<!--
name: 'Skill Code: Git raw command matching note'
description: >-
  Explains that command filtering matches raw text case-insensitively and
  advises rewording text that triggers false positive matches.
ccVersion: 2.1.273
-->
The match is on the raw command text (case-insensitive in PowerShell, so a lowercase short flag can trip an uppercase one), so message, body or path text that merely contains one of these fragments trips it too; reword that text if so.
