<!--
name: 'Tool Description: Reconnect connector'
description: >-
  Describes the tool for retrying a broken connector connection and guiding the
  user to re-authenticate.
ccVersion: 2.1.310
variables:
  - CONNECTOR_NAME
-->
The "${CONNECTOR_NAME}" connector is installed, but its sign-in has stopped working, so its tools are unavailable. Call this tool only when the user's request needs this connector (even if they didn't name it explicitly). It tries the connection again. If the connector still needs a sign-in, the call fails, and the user may be shown a prompt to sign in again. Then tell them in one short sentence that ${CONNECTOR_NAME} needs them to sign in again, carry on with whatever does not need it, and do not call this tool again until they send another message. If the call fails for another reason, tell them that ${CONNECTOR_NAME} is not available right now. If the connection succeeds, the connector's tools become available. Do not ask the user for authorization codes, tokens, or URLs.
