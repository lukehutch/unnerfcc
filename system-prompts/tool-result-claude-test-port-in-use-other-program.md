<!--
name: 'Tool Result: Claude Test port in use by other program'
description: >-
  Warns that an external program occupies the port so the app is not up and
  tests should not run.
ccVersion: 2.1.310
-->
A program that works outside this project's folder holds the app's own port, so the app is NOT up and the page there is not this app. Start nothing on that port (a start there fails, or moves to a port this check does not look at) and write no test. Ask as the run skill says under "Port in use".
