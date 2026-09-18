<!--
name: 'Tool Description: claude_test_app_up'
description: >-
  Checks whether the application under test is currently listening on the local
  machine.
ccVersion: 2.1.277
-->
Say whether the app under test is listening on this machine right now. The browser helper runs outside Claude Code's command sandbox, so it can see localhost when "ct.mjs status" could not (devServer.sandboxed). It tries only the ports of this machine that Claude Test would try for this project (its base URL's, or those its files name and a few usual ones), by address: it only connects, and sends no data at all; "up" is about the base URL's address when one is set, else about the ports the project's own files name. Call it from the person's conversation with devServer.check.arguments as status printed them, before a run is started.
