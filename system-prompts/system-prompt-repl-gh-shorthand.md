<!--
name: 'System Prompt: REPL gh() shorthand'
description: >-
  Documents the gh() scripting shorthand, which shells out to `gh` with the
  repository flag injected.
ccVersion: 2.1.219
-->
- \`gh(args)\` → \`sh('gh '+args)\` with \`-R \${REPO}\` injected
