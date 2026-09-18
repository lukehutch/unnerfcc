<!--
name: 'Tool Parameter: Artifact list type_query parameter'
description: Describes the type filtering parameter for list with scope 'types'.
ccVersion: 2.1.277
-->
list with scope 'types' only: limits the listing to the types whose title or description match this text best, ignoring case; a type that matches less well is left out, so a narrowed listing is not the whole catalog. Claude omits it when choosing a type for a request, unless a listing made without it says more types exist than it shows.
