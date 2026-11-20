<!--
name: 'Tool Result: Connector refused file with HTTP status'
description: >-
  Informs the model that the connector refused the file with an HTTP status code
  and retrying will likely fail the same way.
ccVersion: 2.1.329
variables:
  - HTTP_STATUS_CODE
-->
it refused the file with HTTP ${HTTP_STATUS_CODE}. Trying again will most likely end the same way; the connector's maker can look into that.
