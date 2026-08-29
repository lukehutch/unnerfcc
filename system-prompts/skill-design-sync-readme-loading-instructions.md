<!--
name: 'Skill: Design sync README loading instructions'
description: >-
  Instructions and HTML snippet for loading the bundled design system scripts
  and stylesheets.
ccVersion: 2.1.251
variables:
  - GLOBAL_NAMESPACE
-->

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.${GLOBAL_NAMESPACE}.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { 
