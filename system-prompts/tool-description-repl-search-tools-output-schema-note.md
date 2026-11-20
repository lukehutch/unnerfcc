<!--
name: 'Tool Description: REPL searchTools output schema note'
description: >-
  Model-facing REPL declaration fragment explaining that searchTools results
  include output schemas when declared and that oversized results with images
  may arrive as content block arrays.
ccVersion: 2.1.329
-->
such as {query: string, limit?: number}, and output, where the tool's server declares it, the type of what a call resolves to. A result over the output limit that has a picture in it may come as an array of content blocks, whatever type is declared. Resolves
