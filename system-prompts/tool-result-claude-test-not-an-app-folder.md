<!--
name: 'Tool Result: Claude Test not an app folder'
description: >-
  Informs the model that the folder does not look like an app folder and how to
  resolve or specify the correct app directory.
ccVersion: 2.1.310
-->
 does not look like an app folder (no app manifest such as package.json, no .claude-testrc, no Claude Test specs); the helper must be started from the app folder you mean (from a shell: cd <dir> && node …/ct.mjs status), or ask the user which folder. If this folder IS the app, a .claude-testrc here (baseUrl: http://localhost:<port>) settles it
