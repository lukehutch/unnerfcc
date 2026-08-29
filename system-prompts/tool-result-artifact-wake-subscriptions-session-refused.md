<!--
name: 'Tool Result: Artifact service refuses wake subscriptions from session'
description: >-
  Explains that the artifact service refuses wake subscriptions for the
  remainder of the session and only explicit watch calls re-check.
ccVersion: 2.1.251
-->
The artifact service refuses wake subscriptions from this session, for any artifact until the session ends, so retrying will not help. Later publishes in this session are not armed; only an explicit watch re-checks with the service.
