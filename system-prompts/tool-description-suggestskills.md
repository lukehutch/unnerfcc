<!--
name: 'Tool description: SuggestSkills'
description: >-
  Model-facing prompt of the SuggestSkills tool describing when to render a card
  of addable standalone (org/shared/Anthropic) skills not yet enabled.
ccVersion: 2.1.199
-->
Render a card of standalone skills the user can add — org, shared, or Anthropic skills not yet enabled. Use when the user asks you to recommend skills, asks for skills for a domain they have nothing enabled for, or when ListSkills returned zero matches. Use ListSkills instead for skills they already have.

Always pass keywords from the user's request. The result may be empty.
