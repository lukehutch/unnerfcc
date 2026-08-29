<!--
name: 'Tool Result: Not an artifact URL'
description: >-
  Tells the model that the provided URL is not a valid artifact link and
  explains how to update or publish.
ccVersion: 2.1.251
variables:
  - INVALID_URL
-->
not an artifact URL: ${INVALID_URL} — to update an existing artifact pass its …/code/artifact/<uuid> link (action: "list" shows them); to publish a new one, omit `url`.
