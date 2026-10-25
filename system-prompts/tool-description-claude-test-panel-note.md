<!--
name: 'Tool Description: claude_test_panel_note'
description: >-
  Reports status notes to Claude Test's panel that cannot be derived directly
  from the run folder.
ccVersion: 2.1.310
-->
Tell Claude Test's panel what it cannot read from the run folder: the app's state, your onboarding guesses, or that a helper did not start. Call it only where the run skill's panel rule says so (section 3, step 6, "The panel's notes"), with project as status's projectDir and only the notes that are due. Every value is a word of a fixed list or a number: the helper writes them to the newest run folder's pane.json, for the panel alone, and answers { ok: true }. It asks nothing and starts nothing; besides the run folder it reads only the project's package.json and start command. A background run never calls it.
