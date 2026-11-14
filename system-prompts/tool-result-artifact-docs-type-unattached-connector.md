<!--
name: 'Tool Result: Artifact Docs type connector not attached'
description: >-
  Informs the model that the Docs type requires the unattached Claude Docs
  connector and directs creating a fallback format instead.
ccVersion: 2.1.325
variables:
  - ARTIFACT_PURPOSE
  - FALLBACK_FORMAT
-->
 type is filled only through the first-party Claude Docs connector, which is not attached in this session: for ${ARTIFACT_PURPOSE}, make ${FALLBACK_FORMAT} instead of starting from that type.
