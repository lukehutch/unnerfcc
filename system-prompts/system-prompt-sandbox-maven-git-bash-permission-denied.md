<!--
name: 'System Prompt: Sandbox Maven Git Bash Permission Denied'
description: >-
  Workaround for Maven in Git Bash looping on permission denied errors in the
  sandbox.
ccVersion: 2.1.310
-->
`mvn` from Git Bash can loop forever on `cd: ...: Permission denied` without starting Java. Kill it and run it as `MAVEN_BASEDIR="$PWD" mvn ...`.
