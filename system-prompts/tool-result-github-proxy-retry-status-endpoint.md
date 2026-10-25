<!--
name: 'Tool Result: GitHub Proxy Retry Status Endpoint'
description: Advises stopping and querying the proxy status endpoint if it fails again.
ccVersion: 2.1.310
variables:
  - STATUS_ENDPOINT
-->
If it fails again, stop and read GET ${STATUS_ENDPOINT} for the proxy's state.
