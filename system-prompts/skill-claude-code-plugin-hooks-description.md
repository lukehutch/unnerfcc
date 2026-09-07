<!--
name: 'Skill: Claude Code plugin hooks description'
description: >-
  Skill description for writing or debugging Claude Code plugins implemented
  with function hooks.
ccVersion: 2.1.263
-->
Write or debug a Claude Code plugin made of function hooks (a hooks module exporting register(on, options), hooks ($, e, next) on events like tool.call, prompt.submit, ui.render, session.start). Load it before writing or changing such a plugin; it says where the exact types come from, how to run a plugin under development, and where the engine reports what it refused.
