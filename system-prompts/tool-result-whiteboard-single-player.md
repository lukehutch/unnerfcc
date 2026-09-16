<!--
name: 'Tool Result: Whiteboard single-player board warning'
description: >-
  Warns that the board is from the single-player whiteboard and rebuilding it is
  lossy, requiring user confirmation before overwriting.
ccVersion: 2.1.273
-->
 is a board from the single-player whiteboard, not a live one — it has no wb-state block to merge into. Rebuilding it on this skill is lossy: boxes, notes, text and arrows from the sketchboard-published JSON on the page can be redrawn as --add elements and will land as your marks, while freehand strokes, plain lines and pasted pictures cannot carry over — tell the user what a rebuild would lose and publish over the same artifact only on their yes
