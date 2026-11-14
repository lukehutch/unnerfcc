<!--
name: 'Tool Parameter: Artifact read page option'
description: >-
  Describes the page parameter for reading rendered HTML when read omits the
  type's own page.
ccVersion: 2.1.325
-->
read only: pass page: true for the rendered page itself where a read otherwise answers something else — a read of an Artifact created from an Artifact type leaves its page out when the type's instructions come with it (the page is the type's own, the same on every Artifact made from it).
