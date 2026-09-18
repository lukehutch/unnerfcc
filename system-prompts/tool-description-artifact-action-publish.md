<!--
name: 'Tool Description: Artifact publish action'
description: Describes the publish action for creating or updating artifacts in place.
ccVersion: 2.1.277
variables:
  - PUBLISH_PARAMS_NOTE
-->
- **publish** (the default): takes `file_path`, plus `icon` on a first publish and an optional one-sentence `description`, and with `url` updates that existing artifact in place${PUBLISH_PARAMS_NOTE}.
