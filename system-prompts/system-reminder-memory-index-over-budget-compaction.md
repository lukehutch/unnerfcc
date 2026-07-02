<!--
name: 'System Reminder: Memory index over budget — compact now'
description: >-
  Instruction injected when a memory index exceeds its read budget; tells the
  model to compact it
ccVersion: 2.1.187
variables:
  - SYSTEM_REMINDER_MEMORY_INDEX_OVER_BUDGET_COMPACTION_VAR_0
  - SYSTEM_REMINDER_MEMORY_INDEX_OVER_BUDGET_COMPACTION_VAR_1
  - SYSTEM_REMINDER_MEMORY_INDEX_OVER_BUDGET_COMPACTION_VAR_2
-->
The ${SYSTEM_REMINDER_MEMORY_INDEX_OVER_BUDGET_COMPACTION_VAR_0.label} at ${SYSTEM_REMINDER_MEMORY_INDEX_OVER_BUDGET_COMPACTION_VAR_0.displayPath} is ${SYSTEM_REMINDER_MEMORY_INDEX_OVER_BUDGET_COMPACTION_VAR_1.sizeDesc}, ${SYSTEM_REMINDER_MEMORY_INDEX_OVER_BUDGET_COMPACTION_VAR_2}. Compact it to under ${SYSTEM_REMINDER_MEMORY_INDEX_OVER_BUDGET_COMPACTION_VAR_1.targetDesc} now: keep one line per entry, move detail into topic files, and merge or drop stale entries.
