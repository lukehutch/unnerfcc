<!--
name: 'Skill: Artifact runtime capabilities'
description: >-
  Reference for declaring an artifact page's runtime capabilities and how
  omitting, clearing, or restating the field changes them.
ccVersion: 2.1.219
-->
# Artifact runtime capabilities

A published Artifact page can declare **runtime capabilities** — abilities the claude.ai viewer grants the page at open time — by passing `capabilities: {name: config}` to the Artifact tool. The control plane is the authority on valid names and config shapes. Declaration gestures: **omitting** `capabilities` on a redeploy carries the stored declaration forward unchanged (and preserves the artifact's stored contract pin); an **empty object** `{}` is the explicit clear-all; a **non-empty object** is a full-set declaration (anything stored but not restated is revoked). Moving a republished artifact's runtime version is a deliberate gesture — pass `contract: 'latest'` to upgrade, or a specific version to pin or roll back — never a side effect of editing.
