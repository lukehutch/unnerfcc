<!--
name: 'Tool Result: Server binding unconfirmed, call not run'
description: >-
  Informs the model that a call was not run because the target could not be
  confirmed to still reach the server from its permission request.
ccVersion: 2.1.329
variables:
  - SERVER_OR_DOMAIN
-->
The call was not run: it could not be confirmed that ${SERVER_OR_DOMAIN} still reaches the server that its permission request was made for. If the call is still needed, make it again: it then goes through the usual permission check.
