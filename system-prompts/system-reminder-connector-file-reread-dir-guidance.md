<!--
name: 'System Reminder: Connector file re-read directory guidance'
description: >-
  Advises re-reading a file under the connector directory to trigger a refetch
  or rerunning the connector tool after asking the user.
ccVersion: 2.1.325
variables:
  - CONNECTOR_FILES_DIR
-->
 But read a file under ${CONNECTOR_FILES_DIR} again, which can fetch it again. If it is still missing after a minute, run the connector's tool again, but ask the user first if that tool changes anything. Do not ask the user to attach it.
