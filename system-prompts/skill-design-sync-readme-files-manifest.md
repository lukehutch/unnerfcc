<!--
name: 'Skill: Design sync README files manifest'
description: >-
  Documentation section listing component files, tokens, and fonts directory
  contents.
ccVersion: 2.1.251
-->
. Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).
