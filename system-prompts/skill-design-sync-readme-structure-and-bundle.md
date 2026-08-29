<!--
name: 'Skill: Design sync README structure and bundle'
description: >-
  Documentation section describing file locations and bundle structure for the
  design system.
ccVersion: 2.1.251
variables:
  - GLOBAL_NAMESPACE
-->
 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.${GLOBAL_NAMESPACE}`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry
