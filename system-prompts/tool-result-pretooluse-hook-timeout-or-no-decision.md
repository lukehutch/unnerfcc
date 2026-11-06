<!--
name: 'Tool Result: PreToolUse hook timeout or indecision'
description: >-
  Explains that tool call refusal was caused by hook timeout or lack of decision
  and advises single-call retry.
ccVersion: 2.1.318
-->
In this session a call is refused when one of its PreToolUse hooks times out, or when an agent hook ends without a decision. If many calls were under way at once, or this one has a very large input, the hook may have run out of time: make this call again on its own, with no other call under way, or with a smaller input. If it happens again, tell the user which hook it is, so that they can fix it or give it a longer "timeout" in their settings. The user needs to do this; Claude should not change the hook.
