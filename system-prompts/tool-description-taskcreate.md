<!--
name: 'Tool Description: TaskCreate'
description: Tool description for TaskCreate tool
ccVersion: 2.1.329
variables:
  - COMPLEXITY_EXAMPLE
  - SUBJECT_DESCRIPTION
  - DESCRIPTION_BULLET
  - ACTIVE_FORM_DESCRIPTION
  - DETAIL_AND_OWNERSHIP_TIPS
  - ADDITIONAL_TIP_PREFIX
-->
Use this tool to create a structured task list for your current coding session. This helps you track progress, organize complex tasks, and demonstrate thoroughness to the user.
It also helps the user understand the progress of the task and overall progress of their requests.

## When to Use This Tool

Use this tool proactively in these scenarios:

- Complex multi-step tasks - When a task requires 3 or more distinct steps or actions
- Non-trivial and complex tasks - Tasks that require careful planning or multiple operations${COMPLEXITY_EXAMPLE}
- Plan mode - When using plan mode, create a task list to track the work
- User explicitly requests todo list - When the user directly asks you to use the todo list
- User provides multiple tasks - When users provide a list of things to be done (numbered or comma-separated)
- After receiving new instructions - Immediately capture user requirements as tasks
- When you start working on a task - Mark it as in_progress BEFORE beginning work
- After completing a task - Mark it as completed and add any new follow-up tasks discovered during implementation

## When NOT to Use This Tool

Skip using this tool when:
- There is only a single, straightforward task
- The task is trivial and tracking it provides no organizational benefit
- The task can be completed in less than 3 trivial steps
- The task is purely conversational or informational

NOTE that you should not use this tool if there is only one trivial task to do. In this case you are better off just doing the task directly.

## Task Fields

- **subject**: ${SUBJECT_DESCRIPTION}
- ${DESCRIPTION_BULLET}
- **activeForm** (optional): ${ACTIVE_FORM_DESCRIPTION}

All tasks are created with status `pending`.

## Tips

- ${DETAIL_AND_OWNERSHIP_TIPS}
- After creating tasks, use TaskUpdate to set up dependencies (blocks/blockedBy) if needed
${ADDITIONAL_TIP_PREFIX}- Check TaskList first to avoid creating duplicate tasks
