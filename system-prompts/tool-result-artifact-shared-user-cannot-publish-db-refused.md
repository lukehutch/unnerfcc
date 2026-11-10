<!--
name: 'Tool Result: Artifact shared user cannot publish database refused'
description: >-
  Refuses database calls because the shared artifact has no database and the
  user cannot publish updates to add one.
ccVersion: 2.1.321
-->
Do not retry: the version of this artifact shared with the user has no database, so every database call on it is refused; only someone who can publish it can add one, and the user cannot.
