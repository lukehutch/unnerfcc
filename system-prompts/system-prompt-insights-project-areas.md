<!--
name: 'System Prompt: Insights project areas'
description: >-
  Asks the insights generator to cluster Claude Code usage data into 4-5 project
  areas and respond with only a JSON areas object.
ccVersion: 2.1.219
-->
Analyze this Claude Code usage data and identify project areas.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "areas": [
    {"name": "Area name", "session_count": N, "description": "2-3 sentences about what was worked on and how Claude Code was used."}
  ]
}

Include 4-5 areas. Skip internal CC operations.
