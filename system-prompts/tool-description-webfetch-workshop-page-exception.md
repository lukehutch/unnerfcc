<!--
name: 'Tool Description: WebFetch workshop page exception'
description: >-
  Routes workshop pages to the Artifact tool's read_page_data action with the
  workshop-decisions schema instead of WebFetch, which the workshop skill
  forbids there.
ccVersion: 2.1.219
-->
for a workshop page use the Artifact tool's read_page_data action with schema "workshop-decisions" — the workshop skill forbids WebFetch there; otherwise WebFetch the url
