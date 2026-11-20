<!--
name: 'Tool Result: Workflow resume fresh run reason suffix'
description: >-
  Suffix explaining why the diverging workflow call and all subsequent calls run
  fresh instead of replaying from cache.
ccVersion: 2.1.329
variables:
  - REASON
-->
 and every call after it run fresh, not from cache: it ${REASON}.
