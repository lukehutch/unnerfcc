<!--
name: 'Tool Description: claude_test_remember_offer'
description: >-
  Presents a native dialog asking whether to add a pre-push test instruction to
  CLAUDE.local.md.
ccVersion: 2.1.310
-->
Ask the person, in a dialog of Claude Code's own, whether Claude adds the one line that runs these tests before each push (run skill §5, "The offer to remember"), in place of the offer in words. Call it only where the run skill makes that offer, as the closing line of that results message, from the person's own conversation, with project as status's projectDir. The dialog says "Have Claude run these tests before each push? Claude adds one line to CLAUDE.local.md (just for you)." and "Accept: add it (Claude Code shows the edit). Decline: write nothing." The answer is "add" with file CLAUDE.local.md (Accept: their yes), "not-now" (Decline), or answer null when neither came. It writes nothing: the conversation makes the edit.
