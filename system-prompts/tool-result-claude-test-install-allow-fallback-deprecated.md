<!--
name: 'Tool Result: Claude Test install allow-fallback deprecated'
description: >-
  Instructs the model that --allow-fallback is deprecated for ct.mjs install and
  how to handle unpinned Playwright versions.
ccVersion: 2.1.293
-->
ct.mjs install no longer accepts --allow-fallback. Nothing was installed. You may run a normal install yourself: call claude_test_install with none of the three fields. If it says that the registry lacks the pinned Playwright, tell the person which newer version it named. Set allowFallback only when the person has asked for that version. Do not install another way.
