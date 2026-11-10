<!--
name: 'Tool Description: Propose skills workflow guidelines'
description: >-
  Specifies calling rules, proposal limits, and restrictions on updating
  built-in or plugin skills versus user skills.
ccVersion: 2.1.321
-->


Call once with all proposals (max 3). Use it when the user asks to turn a workflow or procedure into a skill, or when the same multi-step procedure has recurred and a skill would clearly save future work. Do not call it for one-off tasks, and do not re-propose skills the user has already seen.

An improvement can only update one of the user's own skills, including one of theirs that this session lists as a plugin skill because they uploaded it to claude.ai; the tool tells you when a target is not theirs. Another plugin's skill or a built-in one can't be updated from the card. To customize one of those with this tool, propose it as a new skill under a name of its own — not the original's name, even without its plugin prefix — with a description that says when to use it instead of the original: both stay listed, and the description decides which one is used.
