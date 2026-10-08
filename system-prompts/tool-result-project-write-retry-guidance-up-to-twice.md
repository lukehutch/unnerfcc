<!--
name: 'Tool Result: Project write retry guidance up to twice'
description: Guidance on retrying project_write up to two times before reporting failure.
ccVersion: 2.1.293
variables:
  - PRE_CHECK
  - DOC_STATE
-->
 ${PRE_CHECK} ${DOC_STATE} Try the same project_write again, up to two retries in total. If it still fails, tell the user that the new content was not saved, and offer it to them another way.
