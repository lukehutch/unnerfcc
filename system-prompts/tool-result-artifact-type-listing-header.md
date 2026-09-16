<!--
name: 'Tool Result: Artifact type listing header'
description: >-
  Header preceding a list of artifacts made from a specific type explaining row
  markers and defaults.
ccVersion: 2.1.273
variables:
  - TYPE_NAME
  - LISTING_SCOPE
  - DEFAULT_TYPE
-->
 made from the type ${TYPE_NAME} ${LISTING_SCOPE}. Each row leads with (mine), (shared in the organization) or (shared with the user); a default, when there is one, is always the first row and is marked there, before its title, as the user's or the organization's default (${DEFAULT_TYPE}):
