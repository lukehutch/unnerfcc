<!--
name: 'Tool Description: Propose skills'
description: >-
  Describes the render-only tool that surfaces recurring procedures from the
  session as skill proposals for the user to review.
ccVersion: 2.1.219
-->
Surface recurring multi-step procedures from this session as skill proposals. Render-only — calling this shows a review card in the conversation; it does not write any files or create the skill. The user reviews and saves from the card.

Call once with all proposals (max 3). Use it when the user asks to turn a workflow or procedure into a skill, or when the same multi-step procedure has recurred and a skill would clearly save future work. Do not call it for one-off tasks, and do not re-propose skills the user has already seen.
