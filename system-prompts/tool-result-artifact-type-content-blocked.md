<!--
name: 'Tool Result: Artifact type publisher content blocked'
description: >-
  Error result when an action touches an artifact created from a type whose
  contents require user approval.
ccVersion: 2.1.263
variables:
  - CONTENT_TYPE
-->
this artifact was created from an Artifact type, so its ${CONTENT_TYPE} are the type publisher's content — nothing was returned; retry the same action so it is checked again (the user is asked once where a prompt can reach them)
