<!--
name: 'Tool Result: Artifact session gateway transient read error'
description: >-
  Informs the model that the session gateway returned an HTTP error on read and
  advises retrying shortly.
ccVersion: 2.1.272
variables:
  - HTTP_STATUS
-->
the session gateway could not serve this read just now (HTTP ${HTTP_STATUS}, after one retry); this is transient — retry shortly
