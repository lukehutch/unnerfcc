<!--
name: 'Tool Description: RecommendSkills'
description: >-
  Describes the tool that renders a card of standalone org, shared, or Anthropic
  skills the user could add, and when to use it instead of ListSkills.
ccVersion: 2.1.219
-->
Render a card of standalone skills the user can add — org, shared, or Anthropic skills not yet enabled. Use when the user asks you to recommend skills, asks for skills for a domain they have nothing enabled for, or when ListSkills returned zero matches. Use ListSkills instead for skills they already have.

Always pass keywords from the user's request (you may set trigger: 'user_asked'). The result may be empty.
