<!--
name: 'Agent Prompt: Schedule cloud agent session payload'
description: >-
  Shows the JSON job_config/events payload shape (allowed tools and seed user
  event) used when creating a cloud routine.
ccVersion: 2.1.219
-->
"}}
        ],
        "allowed_tools": ["Bash", "Read", "Write", "Edit", "Glob", "Grep"]
      },
      "events": [
        {"data": {
          "uuid": "<lowercase v4 uuid>",
          "session_id": "",
          "type": "user",
          "parent_tool_use_id": null,
          "message": {"content": "PROMPT_HERE", "role": "user"}
        }}
      ]
    }
  }
}
```

