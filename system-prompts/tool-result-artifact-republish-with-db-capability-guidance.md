<!--
name: 'Tool Result: Artifact republish with db capability guidance'
description: >-
  Advises republishing the artifact with the db capability declared if database
  functionality is required.
ccVersion: 2.1.321
-->
No database call on this artifact can succeed until it is republished with the db capability declared; republish it that way only if it should have a database, otherwise do not retry.
