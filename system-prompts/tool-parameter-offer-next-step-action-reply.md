<!--
name: 'Tool Parameter: Offer next step action reply'
description: >-
  Describes the reply button format, constraints, and character limit for
  offering next steps.
ccVersion: 2.1.318
variables:
  - MAX_CHARACTERS
-->
A reply: the button's text, which a click sends you as the user's message. 1-3 plain words, at most ${MAX_CHARACTERS} characters ("Yes, fix 1", "Not now"). The first button is your pick, so no need to say so. Each word starts with a letter or digit. No quotes, code marks, arrows, emoji, @ or =. Write & only between blanks.
