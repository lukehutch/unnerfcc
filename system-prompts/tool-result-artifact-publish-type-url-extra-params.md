<!--
name: 'Tool Result: Artifact publish type_url invalid extra params'
description: >-
  Validation error instructing to remove conflicting parameters when creating an
  Artifact from type_url.
ccVersion: 2.1.270
-->
a publish with `type_url` always creates a new Artifact whose page and settings come from the type — remove `url`, `pr_review`, `capabilities`, `contract`, `lang`, `deadline`, and `force`
