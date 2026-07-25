<!--
name: 'Tool Description: Ultrareview unavailable, local fallback'
description: >-
  Explains that the model cannot launch the cloud review itself, that the user
  can run `claude ultrareview` from a terminal, and that a local review is
  running at the given effort.
ccVersion: 2.1.219
variables:
  - REVIEW_EFFORT_LEVEL
-->
(Claude can't launch the cloud review directly — the user can run `claude ultrareview` from a terminal to start it. Falling back to a local ${REVIEW_EFFORT_LEVEL}-effort review for now.)

