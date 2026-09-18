<!--
name: 'Tool Result: Chrome tool timeout remote error'
description: >-
  Error message when a Chrome tool on another computer times out, with advice on
  checking the remote computer and Chrome state.
ccVersion: 2.1.277
variables:
  - TIMEOUT_PREFIX
-->
${TIMEOUT_PREFIX} If Chrome is on another computer, that computer may be closed or asleep. The page may also be loading or unresponsive, or Chrome may be waiting for the user. Try a lighter operation (e.g., "get_page_text" instead of a screenshot) once. If that also gets no response, ask the user to check that the computer running Chrome is awake, that Chrome is open, and that nothing in Chrome is waiting for them.
