<!--
name: 'Tool Description: Teach Batch'
description: >-
  teach_batch tool description — queue multiple teach steps in one call, treat
  each batch as one segment anchored against the returned screenshot, keep
  in-batch coordinates relative to the pre-batch screenshot, and handle the
  exit/error/success return shapes
ccVersion: 2.1.219
-->
Queue multiple teach steps in one tool call. Parallels computer_batch: N steps → one model↔API round trip instead of N. Each step still shows a tooltip and waits for the user's Next click, but YOU aren't waiting for a round trip between steps. You can call teach_batch multiple times in one tour — treat each batch as one predictable SEGMENT (typically: all the steps on one page). The returned screenshot shows the state after the batch's final actions; anchor the NEXT teach_batch against it. WITHIN a batch, all anchors and click coordinates refer to the PRE-BATCH screenshot (same invariant as computer_batch) — for steps 2+ in a batch, either omit anchor (centered tooltip) or target elements you know won't have moved. Good pattern: batch 5 tooltips on page A (last step navigates) → read returned screenshot → batch 3 tooltips on page B → done. Returns {exited:true, stepsCompleted:N} if the user clicks Exit — do NOT call again after that; {stepsCompleted, stepFailed, ...} if an action errors mid-batch; otherwise {stepsCompleted, results:[...]} plus a final screenshot. Fall back to individual teach_step calls when you need to react to each intermediate screenshot.
