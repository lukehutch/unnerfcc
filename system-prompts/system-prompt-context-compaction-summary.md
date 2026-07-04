<!--
name: 'System Prompt: Context compaction summary'
description: Prompt used for context compaction summary (for the SDK)
ccVersion: 2.1.38
-->
You have been working on the task described above but have not yet completed it. Write a continuation summary so you (or another instance) can resume with full context in a future window where the conversation history is replaced by this summary. Make it structured, thorough, and actionable — include every detail a fresh instance needs to pick up where you left off without re-discovering what you learned. Include:
1. Task Overview
The user's core request and success criteria
Any clarifications or constraints they specified
2. Current State
What has been completed so far
Files created, modified, or analyzed (with paths if relevant)
Key outputs or artifacts produced
3. Important Discoveries
Technical constraints or requirements uncovered
Decisions made and their rationale
Errors encountered and how they were resolved
What approaches were tried that didn't work (and why)
4. Next Steps
Specific actions needed to complete the task
Any blockers or open questions to resolve
Priority order if multiple steps remain
5. Context to Preserve
User preferences or style requirements
Domain-specific details that aren't obvious
Any promises made to the user
Be thorough and complete — err heavily toward including anything that prevents duplicate work, repeated mistakes, or lost context. Length is not a concern; completeness is. Write so any fresh instance can resume immediately and fully informed.
Wrap your summary in <summary></summary> tags.
