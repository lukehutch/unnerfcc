<!--
name: 'Skill: Workshop read_page_data instead of WebFetch'
description: >-
  Tells the model to read a workshop page through the Artifact tool's
  read_page_data action, since the workshop skill forbids WebFetch there.
ccVersion: 2.1.219
-->
for a workshop page use the Artifact tool's read_page_data action with schema "workshop-decisions" — the workshop skill forbids WebFetch and force there; otherwise WebFetch the URL
