<!--
name: 'Tool Parameter: Artifact type query filter'
description: >-
  Filter parameter for list_types action to narrow artifact types by title or
  description matching.
ccVersion: 2.1.277
-->
list_types only: narrow the listing to the types whose title or description match this text best (case-insensitive); a type that matches less well is left out, so a narrowed listing is not the whole catalog. Omit it when choosing a type for a request, unless a listing made without it says more types exist than it shows.
