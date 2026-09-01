<!--
name: 'Tool Result: Artifact type listing header'
description: >-
  Header preceding a list of artifacts made from a specific type explaining row
  markers and defaults.
ccVersion: 2.1.257
variables:
  - TYPE_NAME
  - LISTING_SCOPE
  - COUNT_NOTE
  - DEFAULT_TYPE
-->
 made from the type ${TYPE_NAME} ${LISTING_SCOPE}${COUNT_NOTE}. Each row leads with (mine) or (shared); a default, when there is one, is always the first row and is marked there, before its title, as the user's or the organization's default (${DEFAULT_TYPE}):
