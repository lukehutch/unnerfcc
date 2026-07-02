<!--
name: 'Data: Context Tip Situation - At-Mention Paths'
description: >-
  Contextual-tip situation-catalog entry for detecting manual file-path typing
  (suggests @ autocomplete)
ccVersion: 2.1.191
-->
User has typed the same file path by hand in multiple turns (e.g. "src/components/foo/bar.tsx" appearing in two or more User messages), or Claude asked "which file do you mean" / "can you specify the path" and the user typed it out. The user is typing paths manually instead of using autocomplete. Do NOT match when paths already have an @ prefix — that means they are already using the feature.
