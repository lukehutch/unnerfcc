<!--
name: 'Tool Result: Copy from external organization artifact cannot ask user'
description: >-
  Explains that copying from an external organization's artifact cannot prompt
  the user in this session and advises not to retry.
ccVersion: 2.1.277
variables:
  - FAILURE_OUTCOME
-->
the source artifact belongs to another organization and nobody can be asked about copying from it in this session, so ${FAILURE_OUTCOME}. Don't retry it here.
