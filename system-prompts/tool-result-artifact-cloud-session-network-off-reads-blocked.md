<!--
name: 'Tool Result: Cloud session network off, artifact reads blocked'
description: >-
  Notifies that artifact data reads are disabled because cloud network access is
  turned off, while writes still work.
ccVersion: 2.1.257
variables:
  - ACTION_OR_URL
-->
${ACTION_OR_URL}: this cloud session's network access is turned off (or could not be confirmed), so it cannot read artifact data — writes still work; do not retry the read here
