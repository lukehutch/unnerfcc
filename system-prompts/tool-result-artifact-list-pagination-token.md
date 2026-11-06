<!--
name: 'Tool Result: Artifact list pagination token'
description: >-
  Informs the model that more artifacts exist and provides the page_token to
  fetch the next page.
ccVersion: 2.1.318
variables:
  - PAGE_TOKEN
-->

(More exist: pass `page_token` "${PAGE_TOKEN}" with the same `scope` to list the next ones.
