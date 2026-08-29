<!--
name: 'Tool Description: Pages That Keep Their State'
description: >-
  Explains the artifact publish capability for self-saving pages like
  checklists, trackers, and polls.
ccVersion: 2.1.251
variables:
  - CAPABILITY_KEY
  - SKILL_NAME
-->
**Pages that keep their state**: a page this user publishes can save new versions of itself — the artifact publish capability, declared as `${CAPABILITY_KEY}` — so a checklist, tracker, plan, or poll keeps its editors' changes for whoever opens it. If people will change things on the page itself (tick items off, edit entries), or fellow editors should fill it in, build it to save itself; load the `${SKILL_NAME}` skill first for the how-to. A page only read needs none of this.
