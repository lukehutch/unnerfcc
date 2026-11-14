<!--
name: 'Tool Result: Connector download storage redirect not followed'
description: >-
  Model-facing connector download error explaining that storage returned a
  redirect address which Anthropic's download service does not follow.
ccVersion: 2.1.325
-->
the connector's storage answered with another address instead of the file, which Anthropic's download service doesn't follow; running the tool again is unlikely to help until the connector's owner fixes this
