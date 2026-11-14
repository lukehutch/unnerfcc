<!--
name: 'Tool Result: Connector read blocked background job workaround'
description: >-
  Informs the model that the session blocks reads outside its working
  directories so an attached file is sent only if allowed.
ccVersion: 2.1.325
variables:
  - SETTING_NAME
-->
This session also blocks reads outside its working directories (${SETTING_NAME}), so an attached file is sent only if 
