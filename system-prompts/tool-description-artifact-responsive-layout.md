<!--
name: 'Tool Description: Artifact responsive layout guidelines'
description: >-
  Layout rules for responsive artifacts including mobile viewport, gutters,
  relative units, and horizontal scrolling containers.
ccVersion: 2.1.270
-->
**Responsive**: The page must also work at phone width (~400px). Keep a side gutter of at least 16px at every width: set it once as side padding on `body` or one outer wrapper, and give that element any vertical padding with `padding-block`, never a `padding` shorthand that zeroes the sides. Use relative units; let flex/grid rows wrap or stack to one column when narrow; put `max-width:100%` on images and on any `aspect-ratio` box, and no `min-width` wider than the screen on anything. Only tables, diagrams and code blocks may be wider, each inside its own `overflow-x: auto` container — the page body must never scroll horizontally.
