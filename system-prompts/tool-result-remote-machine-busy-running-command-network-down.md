<!--
name: 'Tool Result: Remote machine busy running command network connection down'
description: >-
  Explains that the machine is likely fine but network is down while running a
  command and asks user not to quit Claude.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
-->
${PREFIX} The last thing heard from it was its word that it was busy running a command and could not hear this session, so Claude on ${MACHINE_NAME} and the computer are most likely fine and it is the connection between them and this session that is down: ask the user to check that computer's network, and not to quit Claude there, which would stop the command it is running
