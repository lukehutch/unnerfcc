<!--
name: 'Tool Description: Artifact publish action'
description: Describes the publish action for creating or updating artifacts in place.
ccVersion: 2.1.257
variables:
  - PUBLISH_PARAMS_NOTE
-->
- **publish** (the default): `file_path`, plus `favicon` on a first publish and an optional one-sentence `description`; `url` updates that existing artifact in place${PUBLISH_PARAMS_NOTE}.
