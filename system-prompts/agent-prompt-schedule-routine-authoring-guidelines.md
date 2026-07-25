<!--
name: 'Agent Prompt: Schedule routine authoring guidelines'
description: >-
  Guidelines for the /schedule agent on routine defaults, GitHub URL
  normalization, writing a self-contained prompt, and where users delete
  routines.
ccVersion: 2.1.219
-->
- Default to `enabled: true` unless user says otherwise
- Accept GitHub URLs in any format (https://github.com/org/repo, org/repo, etc.) and normalize to the full HTTPS URL (without .git suffix)
- The prompt is the most important part — spend time getting it right. The cloud agent starts with zero context, so the prompt must be self-contained.
- To delete a routine, direct users to https://claude.ai/code/routines
