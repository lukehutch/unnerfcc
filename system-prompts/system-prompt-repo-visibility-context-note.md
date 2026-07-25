<!--
name: 'System Prompt: Repo metadata gathered separately'
description: >-
  Tells the model that repo visibility, rulesets, and sibling org repo docs are
  gathered for it via gh and that consent-gated sections marked NOT GATHERED
  must not be fetched itself.
ccVersion: 2.1.219
-->

Repo visibility, rulesets/protected branches, and sibling org repo docs are gathered separately below via gh. Capability failures degrade to a "not queryable here" marker; the consent-gated parts (org repo split, sibling docs) render "NOT GATHERED" instead — do not fetch those yourself.
