<!--
name: 'Tool Result: Publish upgrade stamps contract'
description: >-
  Informs the model that an upgrade requires stamping the current contract from
  an authorized session or publishing without the contract field.
ccVersion: 2.1.310
variables:
  - ALLOWED_SESSION_DESCRIPTION
-->
Nothing was published: an upgrade stamps the current contract. Tell the user that the upgrade has to be published from ${ALLOWED_SESSION_DESCRIPTION}. To publish the content anyway, publish without the contract field (a stored contract stays as it is; if none is stored the page is published without one).
